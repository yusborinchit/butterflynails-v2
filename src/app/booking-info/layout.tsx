interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Butterfly Nails | Información de la Reserva",
};

export default function BookingInfoLayout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
