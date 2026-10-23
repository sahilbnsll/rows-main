import Image from "next/image";
import type { Photo } from "@/content/photo";

/**
 * A photograph in a fixed-ratio frame (no layout shift), optionally cut as a temple arch.
 * No credit lines are printed on the pictures.
 */
export function Frame({
  photo,
  ratio,
  sizes,
  arch = false,
  priority = false,
  rounded = true,
  quality = 82,
  className = "",
  zoom = false,
}: {
  photo: Photo;
  ratio: string; // e.g. "4 / 5"
  sizes: string;
  arch?: boolean;
  priority?: boolean;
  rounded?: boolean;
  quality?: number;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-sage-deep ${arch ? "arch" : rounded ? "rounded-2xl" : ""} ${zoom ? "zoom-on-hover" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.w}
        height={photo.h}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: photo.position ?? "50% 50%" }}
      />
    </div>
  );
}
