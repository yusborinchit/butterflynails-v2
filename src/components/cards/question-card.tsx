"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Paragraph from "../typography/paragraph";

interface Props {
  question: string;
  answer: string;
  defaultExpanded?: boolean;
  isInverse?: boolean;
}

export default function QuestionCard({
  question,
  answer,
  defaultExpanded = false,
  isInverse = false,
}: Readonly<Props>) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <article
      data-inverse={isInverse}
      onClick={() => setIsExpanded(!isExpanded)}
      className="flex flex-col gap-4 rounded-lg border border-neutral-300 p-6"
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
    </article>
  );
}
