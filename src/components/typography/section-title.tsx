import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: Readonly<Props>) {
  return (
    <h2
      className={twMerge(
        "text-5xl leading-[0.9] font-bold tracking-tighter text-neutral-950",
        className,
      )}
    >
      {children}
    </h2>
  );
}
