import * as React from "react";

import { Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppConversation({ useChatObj, ...props }: React.ComponentProps<typeof Sidebar> & { useChatObj: any }) {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div>Conversation Title</div>
      </header>
      <ChatMessageList className="flex flex-1 flex-col gap-4 p-4">
        {/* TODO: You can map over messages here */}
        {useChatObj.messages.map((message: any, index: number) => (
          <ChatBubble key={index} variant={message.role === 'user' ? 'sent' : 'received'}>
            <ChatBubbleAvatar fallback={message.role === 'user' ? '我' : 'AI'} />
            <ChatBubbleMessage variant={message.role === 'user' ? 'sent' : 'received'}>
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
        {useChatObj.status === 'submitted' && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage isLoading />
          </ChatBubble>
        )}
      </ChatMessageList>
      <form className="relative rounded-none border bg-background focus-within:ring-1 focus-within:ring-ring p-1" onSubmit={useChatObj.handleSubmit}>
        <ChatInput
          placeholder="Type your message here..."
          className="min-h-12 resize-none rounded-none bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          value={useChatObj.input}
          onChange={useChatObj.handleInputChange}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === 'Enter') {
              e.preventDefault();
              useChatObj.handleSubmit();
            }
          }}
        />
        <div className="flex items-center p-3 pt-0">
          <Button variant="ghost" size="icon">
            <Paperclip className="size-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Mic className="size-4" />
            <span className="sr-only">Use Microphone</span>
          </Button>

          <Button size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form> */}
    </SidebarInset>
  );
}
