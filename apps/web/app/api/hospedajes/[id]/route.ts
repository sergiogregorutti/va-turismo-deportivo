import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const hospedaje = await prisma.hospedaje.findUnique({
    where: { id },
  });

  if (!hospedaje) {
    return NextResponse.json(
      { error: "Hospedaje no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(hospedaje);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const session = await verifyToken(token);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      country,
      city,
      location,
      imageUrls,
      priceInfo,
      featured,
      published,
    } = body;

    const hospedaje = await prisma.hospedaje.update({
      where: { id },
      data: {
        title,
        slug: slugify(title),
        description,
        country,
        city: city || null,
        location,
        imageUrls: imageUrls || [],
        priceInfo,
        featured: featured ?? false,
        published: published ?? false,
      },
    });

    return NextResponse.json(hospedaje);
  } catch {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const session = await verifyToken(token);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.hospedaje.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
