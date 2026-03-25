import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const session = await verifyToken(token);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const contacts = await prisma.contactLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, cityCountry, services, date, message } = body;

    if (!name) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactLead.create({
      data: { name, email, cityCountry, services, date, message },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
