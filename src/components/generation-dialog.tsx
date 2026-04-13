import { Buffer } from "buffer/";
import { Download, Loader2 } from "lucide-react";
import { useCallback, useEffect, useEffectEvent, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  checkBuildStatus,
  type GenerationParams,
  startGeneration,
} from "@/lib/generation-service";

interface GenerationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  params: GenerationParams;
}

type GenerationStatus =
  | "initial" // Before generation starts
  | "starting" // Making the initial API call
  | "building" // Waiting for build to complete
  | "ready" // Build is ready to download
  | "error"; // An error occurred

interface DownloadInfo {
  filename: string;
  downloadUrl: string;
}

export function GenerationDialog({
  isOpen,
  onOpenChange,
  params,
}: GenerationDialogProps) {
  const [status, setStatus] = useState<GenerationStatus>("initial");
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [generationDate, setGenerationDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logUrl, setLogUrl] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const startBuild = useCallback(async () => {
    try {
      setStatus("starting");
      setError(null);
      setLogUrl(null);
      setDownloadInfo(null);
      setBlobUrl(null);
      setPollCount(0);

      const result = await startGeneration({
        background_color: params.background_color,
        foreground_color: params.foreground_color,
        ascii_art: params.ascii_art
          ? Buffer.from(params.ascii_art).toString("base64")
          : undefined,
      });

      setGenerationId(result.id);
      setGenerationDate(result.date);
      setStatus("building");
    } catch (err) {
      console.error("Failed to start build:", err);
      setError(err instanceof Error ? err.message : "Failed to start build");
      setStatus("error");
    }
  }, [params]);

  const pollBuildStatus = useEffectEvent(async () => {
    if (!generationId || !generationDate) return;

    try {
      const result = await checkBuildStatus(generationId, generationDate);

      if (!result.ready) return;

      if (result.failed) {
        setError("Build failed. Please try again.");
        setLogUrl(result.logUrl ?? null);
        setStatus("error");
        return;
      }

      const downloadUrl = result.downloadUrl!;
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error("Failed to fetch build artifact");
      const blob = await response.blob();

      setDownloadInfo({ filename: result.filename!, downloadUrl });
      setBlobUrl(URL.createObjectURL(blob));
      setStatus("ready");
    } catch (err) {
      console.error("Failed to check build status:", err);
      setError(
        err instanceof Error ? err.message : "Failed to check build status",
      );
      setStatus("error");
    }
  });

  // Revoke the blob URL when it's replaced or the component unmounts
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  // Start generation when dialog opens
  useEffect(() => {
    if (isOpen && status === "initial") {
      // This is a valid pattern: calling an async function from an effect
      // The setState calls are inside the async function, not synchronous in the effect body
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void startBuild();
    }
  }, [isOpen, status, startBuild]);

  // Poll for build status
  useEffect(() => {
    if (!isOpen || status !== "building" || !generationId) {
      return;
    }

    // Check if we've exceeded the maximum number of polls
    if (pollCount >= 10) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Generation timed out. The build process probably failed.");
      setStatus("error");
      return;
    }

    const timer = setTimeout(() => {
      void pollBuildStatus();
      setPollCount((prev) => prev + 1);
    }, 20000); // Poll every 20 seconds

    return () => clearTimeout(timer);
  }, [isOpen, status, generationId, pollCount]);

  const downloadFile = () => {
    if (!downloadInfo || !blobUrl) return;

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = downloadInfo.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    onOpenChange(false);
  };

  const getStatusMessage = () => {
    switch (status) {
      case "initial":
        return "Preparing to generate custom XeLL build...";
      case "starting":
        return "Starting the build process...";
      case "building":
        return "Building your custom XeLL image. This should take around a minute...";
      case "ready":
        return "Your custom XeLL build is ready!";
      case "error":
        return error ?? "An error occurred during generation";
    }
  };

  const getProgressValue = () => {
    switch (status) {
      case "initial":
        return 0;
      case "starting":
        return 10;
      case "building":
        return Math.min(20 + pollCount * 20, 90);
      case "ready":
        return 100;
      case "error":
        return 100;
      default:
        return 0;
    }
  };

  const isLoading = status === "starting" || status === "building";

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === "ready" ? "Build Complete!" : "Generating Custom XeLL"}
          </AlertDialogTitle>
          <AlertDialogDescription className="py-2">
            {getStatusMessage()}
          </AlertDialogDescription>

          <div className="mt-4">
            <Progress value={getProgressValue()} className="h-2 w-full" />
          </div>

          {status === "error" && (
            <div className="bg-destructive/10 text-destructive mt-4 rounded-md p-3 text-sm">
              <span>{error}</span>
              {logUrl && (
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1 h-auto p-0 text-destructive"
                  onClick={() => window.open(logUrl, "_blank")}
                >
                  Check build log
                </Button>
              )}
            </div>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          {status === "ready" ? (
            <AlertDialogAction onClick={downloadFile}>
              <Download className="mr-2 h-4 w-4" />
              Download XeLL Build
            </AlertDialogAction>
          ) : (
            <>
              {!isLoading && <AlertDialogCancel>Cancel</AlertDialogCancel>}

              {status === "error" && (
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    void startBuild();
                  }}
                >
                  Try Again
                </AlertDialogAction>
              )}

              {isLoading && (
                <Button disabled variant="outline" className="gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Building...
                </Button>
              )}
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
