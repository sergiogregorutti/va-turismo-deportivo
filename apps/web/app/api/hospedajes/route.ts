import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { Country, City, Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") as Country | null;
  const city = searchParams.get("city") as City | null;
  const published = searchParams.get("published");
  const featured = searchParams.get("featured");

  const where: Prisma.HospedajeWhereInput = {};

  if (country) where.country = country;
  if (city) where.city = city;
  if (published === "true") where.published = true;
  if (published === "false") where.published = false;
  if (featured === "true") where.featured = true;

  const hospedajes = await prisma.hospedaje.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(hospedajes);
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

    if (!title || !description || !country || !location) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const slug = slugify(title);

    const hospedaje = await prisma.hospedaje.create({
      data: {
        title,
        slug,
        description,
        country,
        city: city || null,
        location,
        imageUrls: imageUrls || [],
        priceInfo,
        featured: featured || false,
        published: published || false,
      },
    });

    return NextResponse.json(hospedaje, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ya existe un hospedaje con ese titulo" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
