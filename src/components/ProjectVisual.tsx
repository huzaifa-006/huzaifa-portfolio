import Image from "next/image";
import type { Project } from "@/data/projects";
import { withBase } from "@/data/site";

const kindLabel = {
  concept: "Conceptual visual",
  data: "Chart from project data",
  screenshot: "Screenshot",
} as const;

/** Project image with an honest label saying what kind of image it is. */
export default function ProjectVisual({
  project,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  showCaption = false,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
}) {
  const { image } = project;
  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-xl border border-line bg-bg-2">
        <Image
          src={withBase(image.src)}
          alt={image.alt}
          width={1600}
          height={1000}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <span className="absolute right-3 top-3 rounded-md border border-line-strong/80 bg-bg/80 px-2 py-1 font-mono text-[10px] tracking-wider text-ink-2 uppercase backdrop-blur">
          {kindLabel[image.kind]}
        </span>
      </div>
      {showCaption && <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>}
    </figure>
  );
}
