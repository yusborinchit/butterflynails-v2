import GuaranteeCard from "../cards/guarantee-card";
import MainContainer from "../containers/main-container";
import Paragraph from "../typography/paragraph";
import SectionTitle from "../typography/section-title";

export default function GuaranteesSection() {
  return (
    <MainContainer
      id="garantia"
      as="section"
      className="mt-40 flex flex-col items-center gap-6"
    >
      <SectionTitle className="text-center">
        <span className="text-primary-500">-</span>{" "}
        <span>Garantía de Servicios</span>{" "}
        <span className="text-primary-500">-</span>
      </SectionTitle>
      <Paragraph className="max-w-[500px] text-center">
        Por desprendimientos prematuros, ofrecemos{" "}
        <strong>7 días de garantía</strong>. Estos son los casos que{" "}
        <strong>NO cubrimos</strong>.
      </Paragraph>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <GuaranteeCard title="Uñas que previamente estén descamadas por arrancarlas">
          <Paragraph className="text-white/30">
            Los adherentes que utilizamos en nuestros tratamientos están
            diseñados para adherirse eficazmente a la primera capa de la uña.
          </Paragraph>
          <Paragraph className="text-white/30">
            Sin embargo, es importante destacar que, si la superficie de la uña
            presenta descamación o algún tipo de daño, la adhesión puede no ser
            tan efectiva como debería ser.
          </Paragraph>
        </GuaranteeCard>
        <GuaranteeCard title="Uñas con onicofagia">
          <Paragraph className="text-white/30">
            Morderse las uñas puede causar daños significativos en la superficie
            de la uña, haciéndola irregular y débil. Esto puede dificultar que
            las uñas se adhieran correctamente.
          </Paragraph>
          <Paragraph className="text-white/30">
            Las personas que se muerden las uñas a menudo tienen uñas muy
            cortas. haciéndolas menos resistentes ante golpes y causando
            desprendimientos prematuros.
          </Paragraph>
        </GuaranteeCard>
        <GuaranteeCard title="Personas que tengan: Diabetes, Tiroides, problemas hormonales">
          <Paragraph className="text-white/30">
            Cualquiera de estos ejemplos puede generar oleosidad en la uña
            natural, lo que resulta en una menor adherencia de los productos
            aplicados posteriormente.
          </Paragraph>
          <Paragraph className="text-white/30">
            Es importante tener en cuenta que la presencia de aceites naturales
            o residuos grasos en la superficie de la uña puede interferir
            significativamente.
          </Paragraph>
        </GuaranteeCard>
      </div>
    </MainContainer>
  );
}
