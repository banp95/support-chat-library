import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { getClientMessages } from "@/fake/fake-data";
import { useQuery } from "@tanstack/react-query";
import { Copy, Download, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

export default function ChatPage() {
  const { clientId } = useParams();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["chat", clientId],
    queryFn: () => getClientMessages(clientId ?? ""),
    enabled: !!clientId,
    staleTime: 1000 * 60 * 5,
  });
  const [input, setInput] = useState("");

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-full">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-muted animate-pulse flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // const [messages] = useState<Message[]>([
  //   {
  //     role: "agent",
  //     content: "Hello, I am a generative AI agent. How may I assist you today?",
  //     timestamp: "4:08:28 PM",
  //   },
  //   {
  //     role: "user",
  //     content: "Hi, I'd like to check my bill.",
  //     timestamp: "4:08:37 PM",
  //   },
  //   {
  //     role: "agent",
  //     content:
  //       "Please hold for a second.\n\nOk, I can help you with that\n\nI'm pulling up your current bill information\n\nYour current bill is $150, and it is due on August 31, 2024.\n\nIf you need more details, feel free to ask!",
  //     timestamp: "4:08:37 PM",
  //   },
  // ]);

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "agent" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">
                        {message.createdAt.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">
                      {message.createdAt.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
