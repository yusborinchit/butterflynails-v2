interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Butterfly Nails | Iniciar Sesión",
};

export default function SignInLayout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
