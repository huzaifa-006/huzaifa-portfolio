"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "./Icons";

/** Credly badge image with a clean fallback icon if the image can't load. */
export default function BadgeImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);
  // Catch errors that happened before React hydrated.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <span className="grid size-16 shrink-0 place-items-center rounded-xl border border-line bg-panel-2 text-accent" aria-hidden>
        <ShieldCheck size={28} />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={64}
      height={64}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="size-16 shrink-0 object-contain"
    />
  );
}
