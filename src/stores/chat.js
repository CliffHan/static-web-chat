import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  conversations: [],
  selectedIndex: -1,
  getCurrentConversation: () => {
    const state = get();
    return state.conversations[state.selectedIndex] || null;
  },
  addConversation: (conversation) => {
    set((state) => ({
      conversations: [...state.conversations, conversation],
    }));
  },
}));

export default useChatStore;
