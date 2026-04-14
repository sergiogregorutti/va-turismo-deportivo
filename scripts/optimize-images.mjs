#!/usr/bin/env node
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import sharp from "sharp";

const ROOT = join(process.cwd(), "apps/web/public/images");
const MAX_DIMENSION = 2560;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;

const SKIP_DIRS = new Set(["images.backup"]);
const PHOTO_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name) || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(0) + " KB";
}

async function hasAlpha(file) {
  const meta = await sharp(file).metadata();
  if (!meta.hasAlpha) return false;
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const stride = info.channels;
  for (let i = 3; i < data.length; i += stride) {
    if (data[i] < 250) return true;
  }
  return false;
}

async function processFile(file) {
  const ext = extname(file).toLowerCase();
  if (!PHOTO_EXT.has(ext)) return null;

  const original = (await stat(file)).size;
  const meta = await sharp(file).metadata();
  const needsResize =
    (meta.width ?? 0) > MAX_DIMENSION || (meta.height ?? 0) > MAX_DIMENSION;

  let pipeline = sharp(file, { failOn: "none" }).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const keepPng = ext === ".png" && (await hasAlpha(file));
  const outExt = keepPng ? ".png" : ".jpg";
  const outPath = join(dirname(file), basename(file, ext) + outExt);
  const tmpPath = outPath + ".tmp";

  if (keepPng) {
    await pipeline
      .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
      .toFile(tmpPath);
  } else {
    await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toFile(tmpPath);
  }

  if (outPath !== file) {
    await unlink(file);
  }
  await rename(tmpPath, outPath);
  const finalSize = (await stat(outPath)).size;
  return { file, outPath, original, finalSize, renamed: outPath !== file };
}

async function main() {
  const files = await walk(ROOT);
  let totalBefore = 0;
  let totalAfter = 0;
  const renames = [];
  for (const f of files) {
    try {
      const r = await processFile(f);
      if (!r) continue;
      totalBefore += r.original;
      totalAfter += r.finalSize;
      const rel = (p) => p.replace(process.cwd() + "/", "");
      const pct = (((r.original - r.finalSize) / r.original) * 100).toFixed(0);
      console.log(
        `${rel(r.file)} ${fmtKB(r.original)} -> ${rel(r.outPath)} ${fmtKB(
          r.finalSize
        )} (-${pct}%)`
      );
      if (r.renamed) renames.push({ from: r.file, to: r.outPath });
    } catch (err) {
      console.error("ERROR", f, err.message);
    }
  }
  console.log(
    `\nTOTAL: ${fmtKB(totalBefore)} -> ${fmtKB(totalAfter)} (-${(
      ((totalBefore - totalAfter) / totalBefore) *
      100
    ).toFixed(0)}%)`
  );
  if (renames.length) {
    console.log("\nRenamed files (update code references):");
    for (const r of renames) {
      console.log(
        `  ${r.from.replace(process.cwd() + "/", "")} -> ${r.to.replace(
          process.cwd() + "/",
          ""
        )}`
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
