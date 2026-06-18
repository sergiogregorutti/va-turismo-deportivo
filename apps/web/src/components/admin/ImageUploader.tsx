"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  folder?: string;
}

function isBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  folder = "uploads",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");

  const urls = value.filter(Boolean);
  const canAddMore = multiple || urls.length === 0;

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const selected = multiple ? Array.from(files) : [files[0]];
      const uploaded: string[] = [];
      for (const file of selected) {
        const blob = await upload(`${folder}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        uploaded.push(blob.url);
      }
      onChange(multiple ? [...urls, ...uploaded] : uploaded);
    } catch {
      setError("Error al subir la imagen. Proba de nuevo.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    const url = urls[index];
    if (isBlobUrl(url)) {
      // Best-effort cleanup; saving the form is what persists the change
      fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      }).catch(() => {});
    }
    onChange(urls.filter((_, i) => i !== index));
  }

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= urls.length) return;
    const next = [...urls];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function addUrl() {
    const trimmed = urlDraft.trim();
    if (!trimmed) return;
    onChange(multiple ? [...urls, trimmed] : [trimmed]);
    setUrlDraft("");
    setShowUrlInput(false);
  }

  return (
    <div className="space-y-3">
      {urls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {urls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-center px-2 py-1.5 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                {multiple ? (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      className="text-white text-sm px-1.5 py-0.5 rounded hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                      aria-label="Mover antes"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === urls.length - 1}
                      className="text-white text-sm px-1.5 py-0.5 rounded hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                      aria-label="Mover despues"
                    >
                      →
                    </button>
                  </div>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="text-white text-sm px-1.5 py-0.5 rounded hover:bg-red-500/80 cursor-pointer"
                  aria-label="Quitar imagen"
                >
                  ✕
                </button>
              </div>
              {index === 0 && multiple && urls.length > 1 && (
                <span className="absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gold-400 text-navy-900">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <div className="flex items-center gap-3 flex-wrap">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="bg-navy-700 hover:bg-navy-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {uploading
              ? "Subiendo..."
              : urls.length > 0
                ? "+ Agregar imagen"
                : "Subir imagen"}
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-sm text-gray-500 hover:text-navy-700 transition-colors cursor-pointer"
          >
            o pegar URL
          </button>
        </div>
      )}

      {showUrlInput && canAddMore && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-sm"
            placeholder="https://..."
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Agregar
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
