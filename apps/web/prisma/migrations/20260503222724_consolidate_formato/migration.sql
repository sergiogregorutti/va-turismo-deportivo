-- Consolidate Formato enum from 6 values to 3 (Lifestyle / Corporativo / Equipos).
-- Postgres can't drop/recreate an enum that's in use, so we swap via a temporary column.

-- 1. Create new enum
CREATE TYPE "FormatoNew" AS ENUM ('LIFESTYLE', 'CORPORATIVO', 'EQUIPOS');

-- 2. Add temp column on Experience
ALTER TABLE "Experience" ADD COLUMN "formato_new" "FormatoNew";

-- 3. Backfill mapping
UPDATE "Experience" SET "formato_new" = CASE
  WHEN "formato" IN ('SOLO', 'PAREJA', 'FAMILIA', 'AMIGOS') THEN 'LIFESTYLE'::"FormatoNew"
  WHEN "formato" = 'EQUIPO_DEPORTIVO' THEN 'EQUIPOS'::"FormatoNew"
  WHEN "formato" = 'CORPORATIVO' THEN 'CORPORATIVO'::"FormatoNew"
  ELSE NULL
END;

-- 4. Drop old index, swap columns, drop old enum, rename new
DROP INDEX IF EXISTS "Experience_formato_idx";
ALTER TABLE "Experience" DROP COLUMN "formato";
ALTER TABLE "Experience" RENAME COLUMN "formato_new" TO "formato";
DROP TYPE "Formato";
ALTER TYPE "FormatoNew" RENAME TO "Formato";

-- 5. Recreate index
CREATE INDEX "Experience_formato_idx" ON "Experience"("formato");
