import MainContainer from "~/components/containers/main-container";
import EditServiceForm from "~/components/forms/edit-service-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getCachedServices } from "~/lib/cache";

export default async function AdminServicesConfigPage() {
  const services = await getCachedServices();

  return (
    <MainContainer
      as="main"
      className="flex max-w-[1024px] flex-col gap-16 py-4"
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tighter">
          Editar Servicios:
        </h2>
        <Tabs defaultValue={`${services[0]!.id}`} className="mt-2">
          <TabsList className="border border-neutral-300">
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={`${service.id}`}
                className="hover:cursor-pointer"
              >
                {service.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {services.map((service) => (
            <TabsContent key={service.id} value={`${service.id}`}>
              <EditServiceForm key={service.id} service={service} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </MainContainer>
  );
}
