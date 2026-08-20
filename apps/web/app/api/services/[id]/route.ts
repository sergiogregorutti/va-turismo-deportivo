import { NextRequest, NextResponse } from "next/server";
import { ServiceCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";
import { safeDeleteBlobs } from "@/lib/blob";

function isCategory(value: unknown): value is ServiceCategory {
  return value === "TRANSPORTE" || value === "CONCIERGE";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = await prisma.serviceItem.findUnique({ where: { id } });

  if (!service) {
    return NextResponse.json(
      { error: "Servicio no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(service);
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
    const { category, title, description, imageUrl, badge, order, published } =
      body;

    if (!isCategory(category)) {
      return NextResponse.json(
        { error: "Categoria invalida" },
        { status: 400 }
      );
    }

    const previous = await prisma.serviceItem.findUnique({ where: { id } });

    const service = await prisma.serviceItem.update({
      where: { id },
      data: {
        category,
        title,
        description: description || "",
        imageUrl,
        badge: badge || null,
        order: order ?? 0,
        published: published ?? true,
      },
    });

    if (previous && previous.imageUrl !== service.imageUrl) {
      await safeDeleteBlobs([previous.imageUrl]);
    }

    return NextResponse.json(service);
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
    const service = await prisma.serviceItem.delete({ where: { id } });
    await safeDeleteBlobs([service.imageUrl]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
