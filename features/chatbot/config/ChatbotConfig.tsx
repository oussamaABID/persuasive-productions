import { createChatBotMessage } from 'react-chatbot-kit';
import ServiceLinkWidget from '@/features/chatbot/components/ServiceLinkWidget';
import PortfolioWidget from '@/features/chatbot/components/PortfolioWidget';
import QuickReplyWidget from '@/features/chatbot/components/QuickReplyWidget';

/**
 * ChatbotConfig — Exquisite Concierge Configuration.
 * Defines the initial state, widgets, and styles for the Studio Concierge.
 */
const ChatbotConfig = {
  initialMessages: [
    createChatBotMessage(
      'Welcome. I am the Studio Concierge for Persuasive Productions.',
      {}
    ),
    createChatBotMessage(
      'Our studio specializes in the cinematic capturing of essence. I can assist you with our artistic portfolio, session packages, or Erika\'s creative vision. How may I illuminate your inquiry?',
      { 
        widget: 'quickReplies',
        delay: 800 
      }
    ),
  ],
  botName: 'Studio Concierge',
  customStyles: {
    botMessageBox: { backgroundColor: 'transparent' },
    chatButton: { backgroundColor: 'transparent' },
  },
  widgets: [
    {
      widgetName: 'serviceLinkWidget',
      widgetFunc: (props: object) => <ServiceLinkWidget {...(props as any)} />,
      mapStateToProps: [],
    },
    {
      widgetName: 'portfolioWidget',
      widgetFunc: (props: object) => <PortfolioWidget {...(props as object)} />,
      mapStateToProps: [],
    },
    {
      widgetName: 'quickReplies',
      widgetFunc: (props: object) => <QuickReplyWidget {...(props as any)} />,
      mapStateToProps: [],
    },
  ],
};

export default ChatbotConfig;
