import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdminRequest } from "@/lib/auth";
import { isBlobUrl, safeDeleteBlobs } from "@/lib/blob";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdminRequest(request))) {
          throw new Error("No autorizado");
        }
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "image/gif",
            "image/svg+xml",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 15 * 1024 * 1024,
        };
      },
      // No onUploadCompleted: the admin client reads the blob URL directly from
      // upload()'s return value. Declaring the callback would require a publicly
      // reachable URL, which hangs uploads on localhost.
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al subir la imagen";
    const status = message === "No autorizado" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const url = request.nextUrl.searchParams.get("url");
  if (url && isBlobUrl(url)) {
    await safeDeleteBlobs([url]);
  }
  return NextResponse.json({ ok: true });
}
