import Footer from "~/components/footer";
import Header from "~/components/header";
import BookingSection from "~/components/sections/booking-section";
import ClientsSection from "~/components/sections/clients-section";
import FAQSection from "~/components/sections/faq-section";
import GuaranteesSection from "~/components/sections/guarantees-section";
import HeroSection from "~/components/sections/hero-section";
import ServicesSection from "~/components/sections/services-section";
import { getCachedBookingTimes, getCachedServices } from "~/lib/cache";

export default async function HomePage() {
  const [services, bookingTimes] = await Promise.all([
    getCachedServices(),
    getCachedBookingTimes(),
  ]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection services={services} />
        <ClientsSection />
        <GuaranteesSection />
        <BookingSection services={services} bookingTimes={bookingTimes} />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
