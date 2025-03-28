import MainContainer from "~/components/containers/main-container";
import SignInForm from "~/components/forms/sign-in-form";

export default function SignInPage() {
  return (
    <MainContainer className="grid min-h-screen place-items-center">
      <div className="flex w-full max-w-[350px] flex-col gap-4">
        <div>
          <p className="text-sm text-neutral-500">
            Hola si no sos Mika andate chau
          </p>
          <h2 className="text-4xl font-bold tracking-tighter">
            Iniciar Sesión 🤓
          </h2>
        </div>
        <SignInForm />
      </div>
    </MainContainer>
  );
}
