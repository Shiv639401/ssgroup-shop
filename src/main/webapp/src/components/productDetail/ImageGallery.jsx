import React, { useMemo, useState } from "react";

export default function ImageGallery({ images = [], title = "" }) {
  const safeImages = useMemo(() => {
    const arr = Array.isArray(images) ? images.filter(Boolean) : [];
    return arr.length ? arr : [null];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = safeImages[activeIndex];

  return (
    <div className="grid grid-cols-[64px_1fr] gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {safeImages.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-14 w-14 rounded-xl border overflow-hidden bg-gray-100 transition ${
              idx === activeIndex ? "ring-2 ring-accent border-accent" : "hover:border-gray-300"
            }`}
            aria-label={`thumbnail-${idx}`}
          >
            {src ? (
              <img src={src} alt={`${title} ${idx}`} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                No Img
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="rounded-2xl border bg-white overflow-hidden shadow-card">
        <div className="relative group h-[420px] bg-gray-100 overflow-hidden">
          {active ? (
            <img
              src={active}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
            Hover to zoom
          </div>
        </div>
      </div>
    </div>
  );
}
