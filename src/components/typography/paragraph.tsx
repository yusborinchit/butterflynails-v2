import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Paragraph({ children, className }: Readonly<Props>) {
  return (
    <p className={twMerge("text-lg text-neutral-500", className)}>{children}</p>
  );
}
