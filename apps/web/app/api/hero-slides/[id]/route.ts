import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";
import { safeDeleteBlobs } from "@/lib/blob";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data: { order?: number; published?: boolean; alt?: string | null } =
      {};
    if (typeof body.order === "number") data.order = body.order;
    if (typeof body.published === "boolean") data.published = body.published;
    if ("alt" in body) data.alt = body.alt || null;

    const slide = await prisma.heroSlide.update({ where: { id }, data });
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const slide = await prisma.heroSlide.delete({ where: { id } });
    await safeDeleteBlobs([slide.imageUrl]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
