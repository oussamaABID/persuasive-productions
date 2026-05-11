import { createChatBotMessage } from 'react-chatbot-kit';
import BookingWidget from '@/features/chatbot/components/BookingWidget';
import PortfolioWidget from '@/features/chatbot/components/PortfolioWidget';

const ChatbotConfig = {
  initialMessages: [
    createChatBotMessage(
      'Welcome. I am the Studio Concierge for Persuasive Productions.',
      {}
    ),
    createChatBotMessage(
      'I can assist you with our portfolio, packages, or booking a session with Erika. How may I serve you?',
      { delay: 600 }
    ),
  ],
  botName: 'Studio Concierge',
  customStyles: {
    botMessageBox: { backgroundColor: 'transparent' },
    chatButton: { backgroundColor: 'transparent' },
  },
  widgets: [
    {
      widgetName: 'bookingWidget',
      widgetFunc: (props: object) => <BookingWidget {...(props as object)} />,
      mapStateToProps: [],
    },
    {
      widgetName: 'portfolioWidget',
      widgetFunc: (props: object) => <PortfolioWidget {...(props as object)} />,
      mapStateToProps: [],
    },
  ],
};

export default ChatbotConfig;
