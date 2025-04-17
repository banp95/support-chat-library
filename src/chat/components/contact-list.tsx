import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getClients } from "@/fake/fake-data";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";

export default function ContactList() {
  const { clientId } = useParams();

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
    staleTime: 100 * 60 * 5,
  });
  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            {isLoading && (
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2 p-2">
                    <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  </div>
                ))}
              </div>
            )}
            {clients?.map((client) => (
              <NavLink
                key={client.id}
                to={`/chat/${client.id}`}
                className={({ isActive }) =>
                  `${buttonVariants({
                    variant: "ghost",
                    className: `w-full justify-start ${
                      isActive && "bg-gray-100 text-shadow-gray-900"
                    }`,
                  })} `
                }
              >
                <div
                  className={`h-6 w-6 rounded-full ${
                    client.id === clientId ? "bg-gray-900 " : "bg-green-500 "
                  } mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs`}
                >
                  {client.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
                {client.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
