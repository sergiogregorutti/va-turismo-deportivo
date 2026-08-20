/**
 * Seed acotado de la pagina Servicios: crea los items de Transporte y
 * Concierge que antes vivian hardcodeados en el codigo. Solo corre si la
 * tabla esta vacia, asi no pisa lo que ya se haya cargado desde el admin.
 *
 * Uso: pnpm exec tsx --env-file=.env scripts/seed-services.ts
 */
import { PrismaClient } from "@prisma/client";
import { services } from "./seed-data/services";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.serviceItem.count();
  if (existing > 0) {
    console.log(`- servicios ya existentes (${existing}), no se toca nada`);
    return;
  }

  await prisma.serviceItem.createMany({
    data: services.map((s, order) => ({ ...s, order })),
  });
  console.log(`✔ ${services.length} servicios creados`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
