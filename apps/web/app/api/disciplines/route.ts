import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const disciplines = await prisma.discipline.findMany({
    include: { _count: { select: { experiences: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(disciplines);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const session = await verifyToken(token);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, imageUrl, modalities } = body;

    if (!name || !modalities?.length) {
      return NextResponse.json(
        { error: "Nombre y modalidades son requeridos" },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    const discipline = await prisma.discipline.create({
      data: { name, slug, description, imageUrl, modalities },
    });

    return NextResponse.json(discipline, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ya existe una disciplina con ese nombre" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
