import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/src/stores/chat";

export function useConversation() {
    const chatStore = useChatStore();
    const storedConversation = chatStore.getCurrentConversation();
    const config = chatStore.config;
    // console.log(`useConversation(), conversation.id: ${storedConversation?.id}`)
    // console.log(`useConversation(), config: ${JSON.stringify(config)}`);
    const chatInstance = useChat({
        id: storedConversation?.id,
        initialMessages: storedConversation?.messages || [],
        api: config.baseURL ? `${config.baseURL}/usechat` : undefined,
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


    return {
        chatInstance,
        ...storedConversation,
    };
}