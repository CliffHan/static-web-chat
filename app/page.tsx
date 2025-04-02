"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppConversation } from "./app-conversation";
// import { useChatStore, createNewConversation } from "@/src/stores/chat";
import { useEffect } from "react";
import { useChat } from "@ai-sdk/react";

export default function Home() {
  // const chatStore = useChatStore();
  // useEffect(() => {
  //   if (!chatStore.getCurrentConversation()) {
  //     const newConversation = createNewConversation();
  //     chatStore.init(newConversation);
  //   } else {
  //     chatStore.init(null);
  //   }
  //   console.log(`chatStore=${JSON.stringify(chatStore)}`);
  //   (window as any).chatStore = chatStore;
  // }, []);

  const useChatObj = useChat({
    api: "http://127.0.0.1:6001/ai-sdk/usechat",
    onFinish: (message, { usage, finishReason }) => {
      console.log("Finished streaming message:", message);
      console.log("Token usage:", usage);
      console.log("Finish reason:", finishReason);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
    onResponse: (response) => {
      console.log("Received HTTP response from server:", response);
    },
  });
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppConversation useChatObj={useChatObj} />
    </SidebarProvider>
  );
}

