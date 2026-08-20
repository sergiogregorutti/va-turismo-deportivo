import { NextRequest, NextResponse } from "next/server";
import { ServiceCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

function isCategory(value: unknown): value is ServiceCategory {
  return value === "TRANSPORTE" || value === "CONCIERGE";
}

export async function GET() {
  const services = await prisma.serviceItem.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { category, title, description, imageUrl, badge, order, published } =
      body;

    if (!isCategory(category)) {
      return NextResponse.json(
        { error: "Categoria invalida" },
        { status: 400 }
      );
    }

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Titulo e imagen son requeridos" },
        { status: 400 }
      );
    }

    const service = await prisma.serviceItem.create({
      data: {
        category,
        title,
        description: description || "",
        imageUrl,
        badge: badge || null,
        order: order ?? 0,
        published: published ?? true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
