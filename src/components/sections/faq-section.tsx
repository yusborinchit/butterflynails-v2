import QuestionCard from "../cards/question-card";
import MainContainer from "../containers/main-container";
import Paragraph from "../typography/paragraph";
import SectionTitle from "../typography/section-title";

export default function FAQSection() {
  return (
    <MainContainer
      id="faq"
      as="section"
      className="mt-40 flex flex-col items-center gap-6"
    >
      <SectionTitle className="text-center">
        <span className="text-primary-500">-</span>{" "}
        <span>Preguntas Frecuentes</span>{" "}
        <span className="text-primary-500">-</span>
      </SectionTitle>
      <Paragraph className="max-w-[500px] text-center">
        Aquí encontrarás respuestas a las dudas más comunes sobre mis servicios.
        Si tienes más preguntas, no dudes en escribirme.
      </Paragraph>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <QuestionCard
            question="Las Soft Gel requieren mantenimiento"
            answer="No exactamente. Cada 21 días deben retirarse por completo y volver a aplicarse."
          />
          <QuestionCard
            question="Por qué es necesario venir cada 21 días"
            answer="A medida que la uña crece, el esmaltado o el tip pueden despegarse ligeramente.  
            Esto podría permitir la acumulación de humedad y favorecer infecciones como Pseudomonas (bacteria)  
            o infecciones fúngicas (onicomicosis, un hongo). Al asistir cada 21 días, se pueden detectar a tiempo  
            y evitar riesgos. No realizo servicios sobre uñas con infecciones, hongos o dañadas."
            defaultExpanded={true}
          />
          <QuestionCard
            question="Cómo cuidar mis uñas para que duren intactas los 21 días"
            answer="Usa guantes para tareas domésticas, evita exponerlas a la humedad por períodos prolongados,  
            no te las lleves a la boca y ten cuidado con golpes (al teclear, abrir objetos, etc.)."
          />
          <QuestionCard
            question="Hay que pagar seña para el servicio"
            answer="Si, la seña es del 50% del total del servicio."
            defaultExpanded={true}
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <QuestionCard
            question="Pueden atenderse menores de 15 años"
            answer="Sí, pero deben venir acompañados por un adulto responsable."
            isInverse={true}
            defaultExpanded={true}
          />
          <QuestionCard
            question="Puedo hacerme las uñas si tengo hongos"
            answer="No. Si solo hay humedad, se limpiará la uña y se podrá realizar el servicio cuando esté  
            completamente seca. Sin embargo, si se ha desarrollado un hongo, es necesario tratarlo con un médico  
            antes de realizar cualquier aplicación."
            isInverse={true}
          />
          <QuestionCard
            question="Qué debo hacer después de agendar"
            answer="Una vez que reserves tu cita, contáctame por Instagram para definir el diseño,  
            confirmar el presupuesto exacto y recibir la ubicación del estudio."
            isInverse={true}
            defaultExpanded={true}
          />
          <QuestionCard
            question="Puedo venir con acompañante"
            answer="No, el servicio se realiza sin acompañantes."
            isInverse={true}
          />
        </div>
      </div>
    </MainContainer>
  );
}
