import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";
import { getSettings, SETTING_KEYS } from "@/lib/settings";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Merge con los defaults de codigo: una key todavia sin fila en la DB tiene
  // que llegar al admin con su valor real, no vacia
  return NextResponse.json(await getSettings());
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;

    for (const key of SETTING_KEYS) {
      const value = body[key];
      if (typeof value !== "string") continue;
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
