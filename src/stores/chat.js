import { create } from 'zustand';

const useChatStore = create((set) => ({
    conversations: [],
    selectedIndex: -1,
    setConversations: (newConversations) => set({ conversations: newConversations }),
    setSelectedIndex: (index) => set({ selectedIndex: index }),
}));

export default useChatStore;