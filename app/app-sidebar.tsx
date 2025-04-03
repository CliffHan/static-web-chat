"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  // SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import useChatStore from "@/src/stores/chat";

export function AppSidebar({ conversation, ...props }: React.ComponentProps<typeof Sidebar> & { conversation: any }) {
  const conversationsMap = useChatStore((state) => state.conversations);
  const selectedIndex = useChatStore((state) => state.selectedIndex);
  const conversations = Object.values(conversationsMap);
  const addConversation = useChatStore((state) => state.addConversation);
  const selectConversation = useChatStore((state) => state.selectConversation);
  // const removeConversation = useChatStore((state) => state.removeConversation);
  // const updateConversation = useChatStore((state) => state.updateConversation);
  const disabled = (conversation?.chatInstance?.status !== 'ready');

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex h-16 shrink-0 items-center justify-center gap-2 border-b px-4">
        AI 教师助手
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>可用操作</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="secondary" disabled={disabled} onClick={addConversation}>创建新对话</Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>所有对话</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conversation: any, index: number) => {
                return (
                  <SidebarMenuItem key={conversation.id || index}>
                    <SidebarMenuButton
                      isActive={conversation.id === selectedIndex}
                      disabled={disabled}
                      onClick={() => {
                        if (conversation.id !== selectedIndex) {
                          selectConversation(conversation.id);
                        }
                      }}>
                      {conversation.title || `对话 ${conversation.id}`}
                    </SidebarMenuButton>
                    {/* <SidebarMenuAction>
                      <Plus></Plus>
                    </SidebarMenuAction> */}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar >
  );
}
