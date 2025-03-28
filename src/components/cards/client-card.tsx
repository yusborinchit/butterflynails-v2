import Image, { type StaticImageData } from "next/image";

interface Props {
  src: StaticImageData;
  alt: string;
}

export default function ClientCard({ src, alt }: Readonly<Props>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={450}
      height={800}
      placeholder="blur"
      className="aspect-3/5 w-full rounded-lg bg-center object-cover odd:mb-4 even:mt-4 md:odd:mb-6 md:even:mt-6"
    />
  );
}
