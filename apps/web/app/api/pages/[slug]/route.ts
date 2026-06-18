import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await prisma.modalityPage.findUnique({ where: { slug } });

  if (!page) {
    return NextResponse.json(
      { error: "Pagina no encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(page);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const body = await request.json();
    const {
      title,
      tagline,
      heroDescription,
      description,
      highlights,
      ctaLabel,
      whatsappMessage,
      metaDescription,
    } = body;

    const page = await prisma.modalityPage.update({
      where: { slug },
      data: {
        title,
        tagline,
        heroDescription,
        description,
        highlights: Array.isArray(highlights) ? highlights : [],
        ctaLabel,
        whatsappMessage,
        metaDescription,
      },
    });

    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
