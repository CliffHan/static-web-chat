"use client";

import * as React from "react";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { CornerDownLeft /*, Mic, Paperclip*/ } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { generateText } from 'ai';
import useChatStore from "@/src/stores/chat";
import { createOpenAI } from '@ai-sdk/openai';

async function generateTitle(config: any, messages: any): Promise<string> {
  const openai = createOpenAI({
    baseURL: config.baseURL,
    apiKey: config.apiKey || "static-web-chat", // must exist, but my llm endpoint doesn't need it
  });
  const model = openai(config.apiKey || "static-web-chat");
  const messagesText = messages.map((message: any) => `${message.role}: ${message.content}`).join('\n');
  const prompt = `请根据以下对话内容，生成一个对话标题，不多于10个字，也不要输出其他任何无关内容：\n\n${messagesText}\n\n对话标题：`;
  const { text } = await generateText({ model, prompt });  
  return text;
}

export function AppConversation({ conversation, ...props }: React.ComponentProps<typeof SidebarInset> & { conversation: any }) {
  const config = useChatStore((state) => state.config);
  const updateConversationTitle = useChatStore((state) => state.updateConversationTitle);
  useEffect(() => {
    if (conversation.chatInstance.status !== 'ready') {
      // do nothing while messages is updating
      return;
    }
    // update title when conversation has more than 2 messages
    if ((conversation.title === "新对话") && (conversation.chatInstance.messages.length > 1)) {
      console.log(`需要更新标题, conversation.chatInstance.messages=${JSON.stringify(conversation.chatInstance.messages)}`);
      generateTitle(config, conversation.chatInstance.messages).then((title) => {
        console.log(`generateTitle() returned title=${title}`);
        updateConversationTitle(conversation.id, title);
      });
    }
  }, [conversation.chatInstance.status]);

  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div>{conversation.title}</div>
      </header>
      <div className="flex-1 min-h-0">
        <ChatMessageList className="h-full gap-4 p-4 overflow-y-auto">
          {/* TODO: You can map over messages here */}
          {conversation.chatInstance.messages.map((message: any, index: number) => (
            <ChatBubble key={index} variant={message.role === 'user' ? 'sent' : 'received'}>
              <ChatBubbleAvatar fallback={message.role === 'user' ? '我' : 'AI'} />
              <ChatBubbleMessage variant={message.role === 'user' ? 'sent' : 'received'}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {conversation.chatInstance.status === 'submitted' && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>
      <form className="shrink-0 relative rounded-none border bg-background focus-within:ring-1 focus-within:ring-ring p-1" onSubmit={conversation.chatInstance.handleSubmit}>
        <ChatInput
          placeholder="在这里输入消息……"
          className="min-h-12 resize-none rounded-none bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          value={conversation.chatInstance.input}
          onChange={conversation.chatInstance.handleInputChange}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === 'Enter') {
              e.preventDefault();
              conversation.chatInstance.handleSubmit();
            }
          }}
        />
        <div className="flex items-center p-3 pt-0">
          {/* <Button variant="ghost" size="icon">
            <Paperclip className="size-4" />
            <span className="sr-only">Attach file</span>
          </Button> */}
          {/* <Button variant="ghost" size="icon">
            <Mic className="size-4" />
            <span className="sr-only">Use Microphone</span>
          </Button> */}

          <Button size="sm" className="ml-auto gap-1.5">
            <span>发送消息</span>
            <div className="flex items-center gap-1 text-xs">
              <span className="rounded border px-1 text-[10px]">Ctrl</span>
              <span>+</span>
              <CornerDownLeft className="size-3.5" />
            </div>
          </Button>
        </div>
      </form>
    </SidebarInset>
  );
}
