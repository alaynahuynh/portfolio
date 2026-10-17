import { cn } from "@/lib/utils";

interface Sized {
  src: string;
  width: number;
  height: number;
}

/**
 * Photos in one row at equal heights, never cropped: each item grows in
 * proportion to its aspect ratio, so the row's width splits the way the
 * photos' shapes need. `stackOnMobile` drops to a single column below sm.
 */
export function JustifiedRow<T extends Sized>({
  images,
  render,
  stackOnMobile = false,
  className,
}: {
  images: T[];
  render: (image: T) => React.ReactNode;
  stackOnMobile?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-4 sm:gap-5",
        stackOnMobile && "flex-col sm:flex-row",
        className,
      )}
    >
      {images.map((image) => (
        <div
          key={image.src}
          className="min-w-0"
          style={{ flex: `${image.width / image.height} 1 0%` }}
        >
          {render(image)}
        </div>
      ))}
    </div>
  );
}
