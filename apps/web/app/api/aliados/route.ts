import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function GET() {
  const aliados = await prisma.aliado.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(aliados);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, tag, logoUrl, published } = body;

    if (!name) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 }
      );
    }

    const last = await prisma.aliado.findFirst({ orderBy: { order: "desc" } });

    const aliado = await prisma.aliado.create({
      data: {
        name,
        tag: tag || null,
        logoUrl: logoUrl || null,
        order: (last?.order ?? -1) + 1,
        published: published ?? true,
      },
    });

    return NextResponse.json(aliado, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
