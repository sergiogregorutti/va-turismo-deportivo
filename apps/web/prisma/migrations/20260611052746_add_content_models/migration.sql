-- CreateTable
CREATE TABLE "CityPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" "Country" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "bestSeasons" TEXT[],
    "sports" TEXT[],
    "highlights" JSONB NOT NULL DEFAULT '[]',
    "gettingThere" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CityPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "country" "Country" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aliado" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT,
    "logoUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aliado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModalityPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "modality" "Modality" NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "highlights" JSONB NOT NULL DEFAULT '[]',
    "ctaLabel" TEXT NOT NULL,
    "whatsappMessage" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModalityPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "CityPage_slug_key" ON "CityPage"("slug");

-- CreateIndex
CREATE INDEX "CityPage_country_published_idx" ON "CityPage"("country", "published");

-- CreateIndex
CREATE INDEX "HeroSlide_country_published_idx" ON "HeroSlide"("country", "published");

-- CreateIndex
CREATE UNIQUE INDEX "ModalityPage_slug_key" ON "ModalityPage"("slug");
