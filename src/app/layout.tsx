import "~/styles/globals.css";

import { type Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Butterfly Nails | Agenda Online",
  description:
    "Agenda Online de Butterfly Nails, embellece tus uñas con estilo y sofisticación, tu satisfacción es nuestra inspiración.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html
      lang="es"
      className={`${font.className} scroll-pt-[calc(72px+16px)] scroll-smooth text-neutral-950`}
    >
      <body>{children}</body>
    </html>
  );
}
