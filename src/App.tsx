import ChatLayout from "./chat/layout/chat-layout";
import ChatPage from "./chat/pages/chat-page";

export default function App() {
  return (
    <div>
      {/* <AuthLayout /> */}
      <ChatLayout>
        <ChatPage />
      </ChatLayout>
    </div>
  );
}
