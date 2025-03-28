interface Props {
  title: string;
  children: React.ReactNode;
}

export default function GuaranteeCard({ title, children }: Readonly<Props>) {
  return (
    <article className="bg-primary-700 even:bg-primary-900 flex flex-col gap-4 rounded-lg px-6 py-10 md:even:col-span-2 md:even:row-start-2 lg:odd:mb-8 lg:even:col-span-1 lg:even:row-start-auto lg:even:mt-8 odd:[&>h3]:text-white even:[&>h3]:text-white">
      <h3 className="text-3xl leading-[1.25] font-semibold tracking-tighter">
        {title}
      </h3>
      {children}
    </article>
  );
}
