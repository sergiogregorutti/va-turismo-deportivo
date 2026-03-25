import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({
    where: { id },
    include: { discipline: true },
  });

  if (!experience) {
    return NextResponse.json(
      { error: "Experiencia no encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(experience);
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
      location,
      modality,
      disciplineId,
      imageUrls,
      startDate,
      endDate,
      priceInfo,
      featured,
      published,
    } = body;

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        title,
        slug: slugify(title),
        description,
        country,
        location,
        modality,
        disciplineId,
        imageUrls: imageUrls || [],
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        priceInfo,
        featured: featured ?? false,
        published: published ?? false,
      },
    });

    return NextResponse.json(experience);
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
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
