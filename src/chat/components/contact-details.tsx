import { getClient } from "@/fake/fake-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { ContactInfo } from "./contact-info";
import { ContactInfoSkeleton } from "./contact-info-skeleton";
import { NotContactSelected } from "./not-contact-selected";

export const ContactDetails = () => {
  const { clientId } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClient(clientId ?? ""),
    enabled: !!clientId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <ContactInfoSkeleton />;
  }
  if (!clientId) {
    return <NotContactSelected />;
  }
  if (client) {
    return <ContactInfo client={client} />;
  }

  return <h1>Client not found</h1>;
};
