import { Instagram } from "lucide-react";
import MainContainer from "./containers/main-container";

export default function Footer() {
  return (
    <footer className="bg-primary-900">
      <MainContainer className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p className="text-lg font-medium tracking-tighter text-white">
          All rights reserved © 2023 Butterfly Nails.
        </p>
        <a
          href="https://www.instagram.com/butterfly_nailx/"
          target="_blank"
          className="flex items-center gap-2 text-white/40 underline"
        >
          <Instagram className="size-6" /> @butterfly_nailx
        </a>
      </MainContainer>
    </footer>
  );
}
