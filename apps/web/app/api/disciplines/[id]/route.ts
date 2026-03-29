import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const discipline = await prisma.discipline.findUnique({
    where: { id },
    include: { _count: { select: { experiences: true } } },
  });

  if (!discipline) {
    return NextResponse.json(
      { error: "Disciplina no encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(discipline);
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
    const { name, description, imageUrl, modalities, countries, cities } = body;

    const discipline = await prisma.discipline.update({
      where: { id },
      data: {
        name,
        slug: slugify(name),
        description,
        imageUrl,
        modalities,
        countries: countries || [],
        cities: cities || [],
      },
    });

    return NextResponse.json(discipline);
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

    const experienceCount = await prisma.experience.count({
      where: { disciplineId: id },
    });

    if (experienceCount > 0) {
      return NextResponse.json(
        {
          error: `No se puede eliminar: tiene ${experienceCount} experiencia(s) asociada(s)`,
        },
        { status: 409 }
      );
    }

    await prisma.discipline.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
