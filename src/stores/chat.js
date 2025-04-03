import { create } from "zustand";

// 创建新对话的辅助函数
export const createNewConversation = () => {
  return {
    id: Date.now().toString(), // 使用时间戳作为唯一ID
    title: "新对话",
    // messages: []
  };
};

export const useChatStore = create((set, get) => ({
  config: {},
  conversations: {}, // 改为map结构，key为id，value为conversation对象
  selectedIndex: "", // 改为字符串类型，存储当前选中对话的id

  getCurrentConversation: () => {
    const state = get();
    return state.conversations[state.selectedIndex] || null;
  },

  addConversation: () => {
    const newConversation = createNewConversation();
    set((state) => ({
      conversations: {
        ...state.conversations,
        [newConversation.id]: newConversation
      },
      selectedIndex: newConversation.id // 添加后自动选中
    }));
    return newConversation.id;
  },

  selectConversation: (id) => {
    // 检查对话是否存在
    if (!get().conversations[id]) {
      console.warn(`对话 ${id} 不存在`);
      return;
    }
    set((state) => ({
      selectedIndex: id
    }));
  },

  init: async () => {
    const state = get();

    // 检查当前选中的对话是否存在
    if (!(state.selectedIndex && state.conversations[state.selectedIndex])) {
      // 检查是否有任何对话
      const conversationIds = Object.keys(state.conversations);
      if (conversationIds.length > 0) {
        const lastId = conversationIds[conversationIds.length - 1];
        set({ selectedIndex: lastId });
      }
      else {
        // 没有对话，创建一个新的
        const newConv = createNewConversation();
        set({
          conversations: { [newConv.id]: newConv },
          selectedIndex: newConv.id
        });
      }
    }
    //TODO: other async initialzation activities
    set({
      config: { 
        baseURL: "http://127.0.0.1:6001/ai-sdk",
      },
    });
  },

  // 更新对话标题
  updateConversationTitle: (id, title) => {
    // 获取指定id的对话，如果存在则更新标题
    const conversations = get().conversations;
    const conversation = conversations[id];
    if (!conversation) {
      console.warn(`对话 ${id} 不存在`);
      return;
    }
    conversation.title = title;
    conversations[id] = conversation;
    set((state) => ({
      conversations: conversations,
    }));
  },

  // 可能需要的其他方法
  updateConversation: (id, updates) => {
    set((state) => ({
      conversations: {
        ...state.conversations,
        [id]: {
          ...state.conversations[id],
          ...updates
        }
      }
    }));
  },

  deleteConversation: (id) => {
    set((state) => {
      const newConversations = { ...state.conversations };
      delete newConversations[id];

      // 如果删除的是当前选中的对话，需要重新选择
      let newSelectedIndex = state.selectedIndex;
      if (id === state.selectedIndex) {
        const ids = Object.keys(newConversations);
        newSelectedIndex = ids.length > 0 ? ids[ids.length - 1] : "";
      }

      return {
        conversations: newConversations,
        selectedIndex: newSelectedIndex
      };
    });
  },

  // addMessage: (conversationId, message) => {
  //   set((state) => ({
  //     conversations: {
  //       ...state.conversations,
  //       [conversationId]: {
  //         ...state.conversations[conversationId],
  //         messages: [
  //           ...state.conversations[conversationId].messages,
  //           message
  //         ]
  //       }
  //     }
  //   }));
  // }
}));

export default useChatStore;
