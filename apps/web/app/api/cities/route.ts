import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const cities = await prisma.cityPage.findMany({
    orderBy: [{ country: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(cities);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
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

    if (!name || !country || !imageUrl) {
      return NextResponse.json(
        { error: "Nombre, pais e imagen son requeridos" },
        { status: 400 }
      );
    }

    const city = await prisma.cityPage.create({
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

    return NextResponse.json(city, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ya existe una ciudad con ese nombre" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
