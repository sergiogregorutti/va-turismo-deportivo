import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: [{ country: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(slides);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { country, imageUrl, alt } = body;

    if (!country || !imageUrl) {
      return NextResponse.json(
        { error: "Pais e imagen son requeridos" },
        { status: 400 }
      );
    }

    const last = await prisma.heroSlide.findFirst({
      where: { country },
      orderBy: { order: "desc" },
    });

    const slide = await prisma.heroSlide.create({
      data: {
        country,
        imageUrl,
        alt: alt || null,
        order: (last?.order ?? -1) + 1,
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
