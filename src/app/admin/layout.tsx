import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminHeader from "~/components/admin-header";
import { env } from "~/env";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Butterfly Nails | Admin",
};

export default async function AdminLayout({ children }: Readonly<Props>) {
  const cookieStore = await cookies();

  const username = cookieStore.get("username");
  const password = cookieStore.get("password");

  if (
    username?.value !== env.ADMIN_USERNAME ||
    password?.value !== env.ADMIN_PASSWORD
  )
    redirect("/sign-in");

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
