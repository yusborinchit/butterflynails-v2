import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  date: string;
  time: string;
  service: string;
}

export default function BookingEmail({
  name,
  date,
  time,
  service,
}: Readonly<Props>) {
  return (
    <Html>
      <Head />
      <Preview>
        Butterfly Nails: Tu cita está confirmada para el {date} a las {time}
      </Preview>
      <Tailwind>
        <Body className="bg-[#f5f5f5] font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px]">
            <Section className="rounded-t-[8px] bg-[#400101] p-[32px] text-center">
              <Heading className="m-0 text-[28px] font-bold text-white">
                Butterfly Nails
              </Heading>
              <Text className="mt-[4px] mb-0 text-[16px] text-white">
                Nails Boutique
              </Text>
            </Section>
            <Section className="bg-white p-[32px]">
              <Heading className="mt-0 mb-[24px] text-[22px] font-bold text-[#400101]">
                Confirmación de Cita
              </Heading>
              <Text className="mb-[16px] text-[16px] text-gray-800">
                Hola {name},
              </Text>
              <Text className="mb-[24px] text-[16px] text-gray-800">
                Tu cita ha sido reservada con éxito. ¡Esperamos verte pronto!
              </Text>
              <Section className="mb-[24px] rounded-[6px] border-l-[4px] border-[#73020c] bg-[#f9f9f9] p-[20px]">
                <Text className="m-0 mb-[2px] text-[15px] text-gray-800">
                  <span className="inline-block w-[70px] font-bold text-black">
                    Servicio:
                  </span>
                  {service}
                </Text>
                <Text className="m-0 mb-[2px] text-[15px] text-gray-800">
                  <span className="inline-block w-[70px] font-bold text-black">
                    Fecha:
                  </span>
                  {date}
                </Text>
                <Text className="m-0 text-[15px] text-gray-800">
                  <span className="inline-block w-[70px] font-bold text-black">
                    Hora:
                  </span>
                  {time}
                </Text>
              </Section>
              <Section className="mb-[32px]">
                <Heading className="mt-0 mb-[16px] text-[18px] font-bold text-[#590209]">
                  Información Importante
                </Heading>
                <Text className="mb-[8px] text-[15px] text-gray-800">
                  • Por favor, llega 5-10 minutos antes de la hora de tu cita
                </Text>
                <Text className="mb-[8px] text-[15px] text-gray-800">
                  • Si necesitas cancelar, hazlo con al menos 24 horas de
                  anticipación
                </Text>
                <Text className="mb-0 text-[15px] text-gray-800">
                  • Para cualquier consulta, llámanos al (123) 456-7890
                </Text>
              </Section>
            </Section>
            <Section className="rounded-b-[8px] bg-[#400101] p-[24px] text-center">
              <Text className="mb-[8px] text-[14px] text-white">
                Butterfly Nails - Nails Boutique
              </Text>
              <Text className="m-0 text-[14px] text-white opacity-80">
                Instagram: @butterfly_nailx
              </Text>
              <Hr className="my-[16px] border-[#723333]" />
              <Text className="m-0 text-[12px] text-white opacity-70">
                © 2025 Butterfly Nails. Todos los derechos reservados.
              </Text>
              <Text className="mt-[8px] mb-0 text-[12px] text-white opacity-70">
                <a
                  href="https://butterflynails.com/unsubscribe"
                  className="text-white underline"
                >
                  Cancelar suscripción
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
