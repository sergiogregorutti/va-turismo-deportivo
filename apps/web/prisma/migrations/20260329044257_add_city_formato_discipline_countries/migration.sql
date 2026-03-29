-- CreateEnum
CREATE TYPE "City" AS ENUM ('BUENOS_AIRES', 'BARILOCHE', 'CORDOBA', 'LOS_ROQUES', 'MARGARITA', 'LA_GRAN_SABANA');

-- CreateEnum
CREATE TYPE "Formato" AS ENUM ('SOLO', 'PAREJA', 'FAMILIA', 'AMIGOS', 'EQUIPO_DEPORTIVO', 'CORPORATIVO');

-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "cities" "City"[],
ADD COLUMN     "countries" "Country"[];

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "city" "City",
ADD COLUMN     "formato" "Formato";

-- CreateIndex
CREATE INDEX "Experience_city_idx" ON "Experience"("city");

-- CreateIndex
CREATE INDEX "Experience_formato_idx" ON "Experience"("formato");
