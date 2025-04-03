"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { type services } from "~/server/db/schema";

type Service = typeof services.$inferSelect;

interface Props extends Service {
  src: StaticImageData;
}

export default function ServiceCard({
  name,
  price,
  description,
  src,
}: Readonly<Props>) {
  return (
    <motion.article
      initial={{ opacity: 0, translateY: "7.5rem" }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: "some" }}
      className="group relative flex aspect-[3/4] flex-col gap-3 overflow-hidden rounded-lg sm:aspect-[3/2] md:aspect-[6/5] xl:aspect-[3/4] xl:[&:nth-child(1)]:mb-6 xl:[&:nth-child(2)]:mt-6 xl:[&:nth-child(3)]:mt-6 xl:[&:nth-child(4)]:mb-6"
    >
      <div className="absolute inset-1.5 z-20 rounded-lg border-5 border-double border-white/40 opacity-0 transition-opacity sm:opacity-100 sm:group-hover:opacity-0"></div>
      <div className="bg-primary-700 absolute inset-0 z-10 flex flex-col gap-4 px-6 py-4 opacity-100 mix-blend-screen transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
        <h3 className="mt-auto text-[38px] leading-[1] font-black text-balance text-white uppercase underline decoration-4">
          {name}.
        </h3>
        <p className="text-white/80">{description}</p>
        <p className="text-xl font-bold text-white">Desde ${price}</p>
      </div>
      <Image
        src={src}
        alt={`Uñas con ${name}.`}
        placeholder="blur"
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full object-cover object-center brightness-[15%] transition-[filter] sm:brightness-100 sm:group-hover:brightness-[15%]"
      />
    </motion.article>
  );
}
