"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Paragraph from "../typography/paragraph";

interface Props {
  question: string;
  answer: string;
  enterFrom: "left" | "right";
  defaultExpanded?: boolean;
}

export default function QuestionCard({
  question,
  answer,
  enterFrom,
  defaultExpanded = false,
}: Readonly<Props>) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.article
      initial={{
        opacity: 0,
        translateX: enterFrom === "left" ? "-7.5rem" : "7.5rem",
      }}
      whileInView={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: "some" }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="flex flex-col gap-4 rounded-lg bg-white p-6"
    >
      <div className="flex items-center gap-4">
        <h3 className="flex-1 text-2xl font-semibold tracking-tight">
          <span className="text-primary-500">¿</span>
          {question}
          <span className="text-primary-500">?</span>
        </h3>
        <ChevronDown
          data-expanded={isExpanded}
          className="text-primary-500 size-8 transition-transform data-[expanded=true]:rotate-180"
        />
      </div>
      {isExpanded && (
        <>
          <div className="min-h-px w-full bg-neutral-300"></div>
          <Paragraph>{answer}</Paragraph>
        </>
      )}
    </motion.article>
  );
}
