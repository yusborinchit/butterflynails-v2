import Image, { type StaticImageData } from "next/image";

interface Props {
  src: StaticImageData;
  alt: string;
}

export default function ClientCard({ src, alt }: Readonly<Props>) {
  return (
    <picture className="relative overflow-hidden rounded-lg odd:mb-4 even:mt-4 md:odd:mb-6 md:even:mt-6">
      <div className="absolute inset-1.5 rounded-lg border-5 border-double border-white/40"></div>
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        className="aspect-3/5 w-full rounded-lg bg-center object-cover"
      />
    </picture>
  );
}
