import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  id?: string;
  as?: React.ElementType;
  className?: string;
}

export default function MainContainer({
  children,
  id,
  as,
  className,
}: Readonly<Props>) {
  const Component = as ?? "div";
  return (
    <Component
      id={id}
      className={twMerge("mx-auto max-w-[1170px] px-4", className)}
    >
      {children}
    </Component>
  );
}
