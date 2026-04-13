const API_BASE_URL = "https://xell-api.barrenechea.cl";
const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/xell-worker/xell-builder/refs/heads/main";

export interface GenerationParams {
  /** LibXenon-formatted BGR color */
  background_color: string;
  /** LibXenon-formatted BGR color */
  foreground_color: string;
  ascii_art?: string;
}

interface GenerationResponse {
  id: string;
  /** Date in YYYYMMDD format */
  date: string;
}

export interface BuildStatus {
  ready: boolean;
  failed?: boolean;
  filename?: string;
  downloadUrl?: string;
  logUrl?: string;
}

/**
 * Starts the generation process by calling the API
 */
export const startGeneration = async (
  params: GenerationParams,
): Promise<GenerationResponse> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value),
  );

  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filteredParams),
  });

  if (!response.ok) {
    const error = (await response.json()) as { error: string };
    throw new Error(error.error ?? "Failed to start generation");
  }

  return response.json() as Promise<GenerationResponse>;
};

/**
 * Polls GitHub for the build status of a generation job.
 * Folder path: YYYY/MMDD{id}/
 */
export const checkBuildStatus = async (
  id: string,
  date: string,
): Promise<BuildStatus> => {
  const year = date.slice(0, 4);
  const mmdd = date.slice(4, 8);
  const folderUrl = `${GITHUB_BASE_URL}/${year}/${mmdd}/${id}`;

  const logResponse = await fetch(`${folderUrl}/log.txt`);

  if (!logResponse.ok) {
    return { ready: false };
  }

  const filenameResponse = await fetch(`${folderUrl}/original-filename.txt`);

  if (!filenameResponse.ok) {
    return { ready: true, failed: true, logUrl: `${folderUrl}/log.txt` };
  }

  const filename = (await filenameResponse.text()).trim();
  const downloadUrl = `${folderUrl}/${id}.tar.gz`;

  return { ready: true, failed: false, filename, downloadUrl };
};
