"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppConversation } from "./app-conversation";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppConversation />
    </SidebarProvider>
  );
}
