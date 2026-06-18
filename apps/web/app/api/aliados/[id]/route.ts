import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";
import { safeDeleteBlobs } from "@/lib/blob";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const aliado = await prisma.aliado.findUnique({ where: { id } });

  if (!aliado) {
    return NextResponse.json(
      { error: "Aliado no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(aliado);
}

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
    const { name, tag, logoUrl, order, published } = body;

    const previous = await prisma.aliado.findUnique({ where: { id } });

    const aliado = await prisma.aliado.update({
      where: { id },
      data: {
        name,
        tag: tag || null,
        logoUrl: logoUrl || null,
        ...(typeof order === "number" ? { order } : {}),
        ...(typeof published === "boolean" ? { published } : {}),
      },
    });

    if (previous?.logoUrl && previous.logoUrl !== aliado.logoUrl) {
      await safeDeleteBlobs([previous.logoUrl]);
    }

    return NextResponse.json(aliado);
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
    const aliado = await prisma.aliado.delete({ where: { id } });
    if (aliado.logoUrl) {
      await safeDeleteBlobs([aliado.logoUrl]);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
