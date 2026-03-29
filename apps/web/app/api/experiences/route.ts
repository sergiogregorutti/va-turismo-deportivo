import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { Country, Modality, City, Formato, Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") as Country | null;
  const city = searchParams.get("city") as City | null;
  const modality = searchParams.get("modality") as Modality | null;
  const formato = searchParams.get("formato") as Formato | null;
  const discipline = searchParams.get("discipline");
  const published = searchParams.get("published");
  const featured = searchParams.get("featured");

  const where: Prisma.ExperienceWhereInput = {};

  if (country) where.country = country;
  if (city) where.city = city;
  if (modality) where.modality = modality;
  if (formato) where.formato = formato;
  if (discipline) where.discipline = { slug: discipline };
  if (published === "true") where.published = true;
  if (published === "false") where.published = false;
  if (featured === "true") where.featured = true;

  const experiences = await prisma.experience.findMany({
    where,
    include: { discipline: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(experiences);
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
      modality,
      formato,
      disciplineId,
      imageUrls,
      startDate,
      endDate,
      priceInfo,
      featured,
      published,
    } = body;

    if (!title || !description || !country || !location || !modality || !disciplineId) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const slug = slugify(title);

    const experience = await prisma.experience.create({
      data: {
        title,
        slug,
        description,
        country,
        city: city || null,
        location,
        modality,
        formato: formato || null,
        disciplineId,
        imageUrls: imageUrls || [],
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        priceInfo,
        featured: featured || false,
        published: published || false,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ya existe una experiencia con ese titulo" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
