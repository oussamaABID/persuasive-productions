import { MessageParserProps } from '@/features/chatbot/types';

/**
 * MessageParser — Enhanced Intent Classifier.
 * Uses expanded keyword mapping and pattern matching to route user queries.
 */
class MessageParser {
  private actions: MessageParserProps['actions'];

  constructor(actionProvider: MessageParserProps['actions']) {
    this.actions = actionProvider;
  }

  parse(message: string): void {
    const input = message.toLowerCase().trim();

    // ─── Intent Matrix ────────────────────────────────────────────────────────
    
    // Greet: Social openers
    const isGreeting = /\b(hi|hello|hey|greetings|bonjour|good morning|good evening|yo|welcome)\b/i.test(input);
    
    // Portfolio: Looking at work
    const isPortfolio = /\b(portfolio|work|gallery|collection|photos|images|shots|look|examples|see|display|art|gallery|noir)\b/i.test(input);
    
    // Packages: Pricing and services
    const isPackages = /\b(package|price|pricing|cost|rate|fee|service|offer|how much|worth|expensive|cheap|val|list|services|menu|\$|investment)\b/i.test(input);
    
    // Booking: Intent to schedule
    const isBooking = /\b(book|session|schedule|reserve|appointment|call|meet|hire|ready|start|inquiry|consult|reservation)\b/i.test(input);
    
    // About: Erika, Studio, Location, Bio
    const isAbout = /\b(about|erika|who|team|studio|vision|style|history|background|story|experience|years|philosophy|where|location|visionary)\b/i.test(input);

    // Philosophy/Process: How we work
    const isPhilosophy = /\b(process|how|philosophy|approach|method|technique|lighting|atmosphere|consultation|step|way|work with)\b/i.test(input);

    // ─── Routing Logic ────────────────────────────────────────────────────────

    if (isGreeting) {
      this.actions.handleGreeting();
    } else if (isPackages) {
      this.actions.handlePackages();
    } else if (isPhilosophy) {
      this.actions.handlePhilosophy();
    } else if (isPortfolio) {
      this.actions.handlePortfolio();
    } else if (isBooking) {
      this.actions.handleBook();
    } else if (isAbout) {
      this.actions.handleAbout();
    } else {
      this.actions.handleFallback();
    }
  }
}

export default MessageParser;
