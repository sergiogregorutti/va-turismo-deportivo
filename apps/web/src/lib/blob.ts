import { del } from "@vercel/blob";

export function isBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

// Best-effort deletion of blob-hosted images; never throws (content removal
// must not fail because of storage cleanup)
export async function safeDeleteBlobs(urls: string[]): Promise<void> {
  const blobUrls = urls.filter(isBlobUrl);
  if (blobUrls.length === 0) return;
  try {
    await del(blobUrls);
  } catch {
    // ignore: orphaned blobs are harmless at this scale
  }
}
