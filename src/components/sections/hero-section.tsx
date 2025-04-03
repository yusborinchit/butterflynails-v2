import MainContainer from "../containers/main-container";
import HeroImages from "../hero-images";
import Paragraph from "../typography/paragraph";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-t from-white via-white via-40% to-transparent sm:via-20% lg:via-transparent">
      <MainContainer className="grid min-h-[calc(100vh-72px)] place-items-center">
        <div className="z-20 flex flex-col items-center gap-6">
          <h1 className="flex flex-col text-center text-7xl leading-[0.85] font-bold tracking-tighter sm:text-8xl md:text-9xl">
            <span>Butterfly</span>
            <span>Nails</span>
          </h1>
          <Paragraph className="max-w-[400px] text-center">
            Embellece tus uñas con estilo y sofisticación. Tu satisfacción es
            nuestra inspiración.
          </Paragraph>
          <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:gap-6">
            <a
              href="#servicios"
              className="bg-secondary-400 rounded-md px-6 py-3 text-center text-lg font-medium text-white brightness-120"
            >
              Saber Más
            </a>
            <a
              href="#agenda"
              className="bg-primary-700 rounded-md px-6 py-3 text-center text-lg font-medium text-white"
            >
              Agendar Ahora
            </a>
          </div>
        </div>
      </MainContainer>
      <HeroImages />
    </section>
  );
}
