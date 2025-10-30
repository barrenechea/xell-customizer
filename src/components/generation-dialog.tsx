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
  base64ToBlob,
  checkDownload,
  DownloadResponse,
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

export function GenerationDialog({
  isOpen,
  onOpenChange,
  params,
}: GenerationDialogProps) {
  const [status, setStatus] = useState<GenerationStatus>("initial");
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const [fileData, setFileData] = useState<DownloadResponse | null>(null);

  const startBuild = useCallback(async () => {
    try {
      setStatus("starting");
      setError(null);
      setPollCount(0);

      const result = await startGeneration({
        background_color: params.background_color,
        foreground_color: params.foreground_color,
        ascii_art: params.ascii_art
          ? Buffer.from(params.ascii_art).toString("base64")
          : undefined,
      });

      setGenerationId(result.id);
      setStatus("building");
    } catch (err) {
      console.error("Failed to start build:", err);
      setError(err instanceof Error ? err.message : "Failed to start build");
      setStatus("error");
    }
  }, [params]);

  const checkBuildStatus = useEffectEvent(async () => {
    if (!generationId) return;

    try {
      const result = await checkDownload(generationId);

      if (result.error) {
        setError(result.error);
        setStatus("error");
        return;
      }

      if (result.file) {
        setFileData(result);
        setStatus("ready");
      }
    } catch (err) {
      // If we get a "not ready" error, keep polling
      if (err instanceof Error && err.message === "File not processed yet") {
        return;
      }

      // Otherwise, show the error
      console.error("Failed to check build status:", err);
      setError(
        err instanceof Error ? err.message : "Failed to check build status",
      );
      setStatus("error");
    }
  });

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
    if (pollCount >= 6) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Generation timed out. The build process probably failed.");
      setStatus("error");
      return;
    }

    const timer = setTimeout(() => {
      void checkBuildStatus();
      setPollCount((prev) => prev + 1);
    }, 20000); // Poll every 20 seconds

    return () => clearTimeout(timer);
  }, [isOpen, status, generationId, pollCount]);

  const downloadFile = () => {
    if (!fileData) return;

    try {
      const blob = base64ToBlob(fileData.file);
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileData.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onOpenChange(false);
    } catch (err) {
      console.error("Failed to download file:", err);
      setError("Failed to download the file");
      setStatus("error");
    }
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
              {error}
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
