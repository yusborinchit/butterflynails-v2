"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import MainContainer from "./containers/main-container";

interface Props {
  href: string;
  children: React.ReactNode;
}

function NavLink({ children, href }: Readonly<Props>) {
  return (
    <a href={href} className="p-4 transition-colors hover:underline">
      {children}
    </a>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        data-open={isOpen}
        onClick={() => setIsOpen(false)}
        className="bg-opacity-60 data-[open=true]:bg-primary-900/60 bg-primary-900/0 fixed inset-0 z-30 h-screen w-screen opacity-0 backdrop-blur-sm transition-opacity data-[open=true]:opacity-100 sm:hidden"
      ></div>
      <div className="sticky top-0 left-0 z-30 bg-white">
        <MainContainer as="header" className="flex h-[72px] items-center py-2">
          <a href="#">
            <Image
              src="/bn-logo.webp"
              width={44}
              height={44}
              alt="El logo de Butterfly Nails."
              className="z-30 h-11 w-11 rounded-full"
            />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="z-50 ml-auto sm:hidden"
          >
            <Menu className="h-11 w-11" />
          </button>
          <nav
            data-open={isOpen}
            className="ml-auto hidden items-center data-[open=false]:flex-row data-[open=true]:absolute data-[open=true]:top-[72px] data-[open=true]:left-0 data-[open=true]:flex data-[open=true]:w-screen data-[open=true]:flex-col data-[open=true]:bg-white data-[open=true]:pb-4 sm:flex sm:flex-row sm:data-[open=true]:relative sm:data-[open=true]:top-0 sm:data-[open=true]:w-auto sm:data-[open=true]:flex-row sm:data-[open=true]:py-0"
          >
            <NavLink href="#">Inicio</NavLink>
            <NavLink href="#servicios">Servicios</NavLink>
            <NavLink href="#clientas">Clientas</NavLink>
            <NavLink href="#garantia">Garantía</NavLink>
            <NavLink href="#agenda">Agenda</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
          </nav>
        </MainContainer>
      </div>
    </>
  );
}
