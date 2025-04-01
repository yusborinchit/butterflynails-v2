import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainContainer from "./containers/main-container";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AdminHeader() {
  const year = dayjs().get("year");

  return (
    <MainContainer
      as="header"
      className="sticky top-0 left-0 z-30 flex max-w-[1024px] items-center justify-between bg-white py-4"
    >
      <Link href="/" className="flex items-center gap-1">
        <ArrowLeft className="size-4" />
        Volver a la Landing
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto hover:cursor-pointer">
          <Avatar className="size-12">
            <AvatarImage src="/fideos-admin.webp" />
            <AvatarFallback>FI</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs font-bold">
            Turnos
          </DropdownMenuLabel>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href="/admin">Administrar Turnos</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href={`/admin/stats/${year}`}>Ver Estadísticas</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs font-bold">
            Configuración
          </DropdownMenuLabel>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href="/admin/config/services">Editar Servicios</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href="/admin/config/booking-times">Editar Horarios</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </MainContainer>
  );
}
