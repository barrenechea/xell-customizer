const API_BASE_URL = "https://xell-api.barrenechea.cl";

export interface GenerationParams {
  /** LibXenon-formatted BGR color */
  background_color: string;
  /** LibXenon-formatted BGR color */
  foreground_color: string;
  ascii_art?: string;
}

interface GenerationResponse {
  id: string;
}

export interface DownloadResponse {
  file: string;
  filename: string;
  error?: string;
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
 * Checks if a generated file is ready for download
 */
export const checkDownload = async (id: string): Promise<DownloadResponse> => {
  const response = await fetch(`${API_BASE_URL}/download/${id}`);

  if (!response.ok) {
    const error = (await response.json()) as { error: string };
    throw new Error(error.error ?? "Failed to check download");
  }

  return response.json() as Promise<DownloadResponse>;
};

/**
 * Helper function to convert a base64 string to a Blob
 */
export const base64ToBlob = (
  base64: string,
  mimeType = "application/octet-stream",
) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
};
