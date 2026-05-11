export interface ChatMessage {
  id: number;
  message: string;
  type: 'bot' | 'user';
  widget?: string;
  loading?: boolean;
  delay?: number;
}

export type ChatIntent =
  | 'greeting'
  | 'book'
  | 'portfolio'
  | 'packages'
  | 'about'
  | 'philosophy'
  | 'fallback';

export interface ActionProviderProps {
  createChatBotMessage: (
    message: string,
    options?: { widget?: string; delay?: number; props?: any }
  ) => ChatMessage;
  setState: React.Dispatch<React.SetStateAction<{ messages: ChatMessage[] }>>;
  children: React.ReactNode;
}

export interface MessageParserProps {
  children: React.ReactNode;
  actions: {
    handleGreeting: () => void;
    handleBook: () => void;
    handlePortfolio: () => void;
    handlePackages: () => void;
    handleAbout: () => void;
    handlePhilosophy: () => void;
    handleFallback: () => void;
  };
}
