import { MessageParserProps } from '@/features/chatbot/types';

/**
 * MessageParser — Keyword intent classifier.
 * Routes raw user input to the appropriate ActionProvider handler.
 * Pure function: no side effects, no data fetching.
 */
class MessageParser {
  private actions: MessageParserProps['actions'];

  constructor(actionProvider: MessageParserProps['actions']) {
    this.actions = actionProvider;
  }

  parse(message: string): void {
    const input = message.toLowerCase().trim();

    const intents: Array<{ keywords: string[]; handler: () => void }> = [
      {
        keywords: ['hello', 'hi', 'hey', 'greet', 'bonjour', 'good'],
        handler: this.actions.handleGreeting,
      },
      {
        keywords: ['book', 'session', 'schedule', 'reserve', 'appointment', 'call', 'meet'],
        handler: this.actions.handleBook,
      },
      {
        keywords: ['portfolio', 'work', 'gallery', 'collection', 'photos', 'images', 'shots', 'look'],
        handler: this.actions.handlePortfolio,
      },
      {
        keywords: ['package', 'price', 'pricing', 'cost', 'rate', 'fee', 'service', 'offer', 'how much', '$'],
        handler: this.actions.handlePackages,
      },
      {
        keywords: ['about', 'erika', 'who', 'team', 'studio', 'vision', 'style'],
        handler: this.actions.handleAbout,
      },
    ];

    const matched = intents.find(({ keywords }) =>
      keywords.some((kw) => input.includes(kw))
    );

    if (matched) {
      matched.handler();
    } else {
      this.actions.handleFallback();
    }
  }
}

export default MessageParser;
