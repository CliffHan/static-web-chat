"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppConversation } from "./app-conversation";
import { useChatStore } from "@/src/stores/chat";
import { useEffect, useState } from "react";
import { AppLoading } from "./app-loading";
import { useConversation } from "@/hooks/use-conversation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const chatStore = useChatStore();
  const conversation = useConversation() as any;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).conversation = conversation;
    }
  }, [conversation]);

  const init = async () => {
    await chatStore.init();
    (window as any).chatStore = chatStore;
    setIsLoading(false);
  }
  useEffect(() => { init(); }, []);

  if (isLoading) {
    return <AppLoading text="正在初始化……" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar conversation={conversation} />
      <AppConversation conversation={conversation} />
    </SidebarProvider>
  );
}