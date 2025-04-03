"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function GuaranteeCard({ title, children }: Readonly<Props>) {
  return (
    <motion.article
      initial={{ opacity: 0, translateY: "7.5rem" }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: "some" }}
      className="bg-primary-700 even:bg-primary-900 flex flex-col gap-4 rounded-lg px-6 py-10 md:even:col-span-2 md:even:row-start-2 lg:odd:mb-8 lg:even:col-span-1 lg:even:row-start-auto lg:even:mt-8 odd:[&>h3]:text-white even:[&>h3]:text-white"
    >
      <h3 className="text-3xl leading-[1.25] font-semibold tracking-tighter">
        {title}
      </h3>
      {children}
    </motion.article>
  );
}
