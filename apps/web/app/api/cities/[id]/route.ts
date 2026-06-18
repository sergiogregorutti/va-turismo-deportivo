import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { safeDeleteBlobs } from "@/lib/blob";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const city = await prisma.cityPage.findUnique({ where: { id } });

  if (!city) {
    return NextResponse.json(
      { error: "Ciudad no encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(city);
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
    const {
      name,
      province,
      country,
      imageUrl,
      tagline,
      intro,
      about,
      climate,
      bestSeasons,
      sports,
      highlights,
      gettingThere,
      order,
      published,
    } = body;

    const previous = await prisma.cityPage.findUnique({ where: { id } });

    const city = await prisma.cityPage.update({
      where: { id },
      data: {
        slug: slugify(name),
        name,
        province: province || "",
        country,
        imageUrl,
        tagline: tagline || "",
        intro: intro || "",
        about: about || "",
        climate: climate || "",
        bestSeasons: bestSeasons || [],
        sports: sports || [],
        highlights: Array.isArray(highlights) ? highlights : [],
        gettingThere: gettingThere || "",
        order: order ?? 0,
        published: published ?? true,
      },
    });

    if (previous && previous.imageUrl !== city.imageUrl) {
      await safeDeleteBlobs([previous.imageUrl]);
    }

    return NextResponse.json(city);
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
    const city = await prisma.cityPage.delete({ where: { id } });
    await safeDeleteBlobs([city.imageUrl]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
