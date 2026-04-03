-- CreateTable
CREATE TABLE "Hospedaje" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" "Country" NOT NULL,
    "city" "City",
    "location" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "priceInfo" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospedaje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hospedaje_slug_key" ON "Hospedaje"("slug");

-- CreateIndex
CREATE INDEX "Hospedaje_country_idx" ON "Hospedaje"("country");

-- CreateIndex
CREATE INDEX "Hospedaje_city_idx" ON "Hospedaje"("city");

-- CreateIndex
CREATE INDEX "Hospedaje_published_idx" ON "Hospedaje"("published");

-- CreateIndex
CREATE INDEX "Hospedaje_featured_idx" ON "Hospedaje"("featured");
