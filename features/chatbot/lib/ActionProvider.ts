import { SiteContent } from '@/lib/types';

interface ActionProviderDeps {
  createChatBotMessage: (message: string, options?: { widget?: string; delay?: number; props?: any }) => unknown;
  setState: React.Dispatch<React.SetStateAction<{ messages: unknown[] }>>;
  children: React.ReactNode;
}

/**
 * ActionProvider — Exquisite Response Engine.
 * All responses are dynamically generated from SiteContent for absolute brand accuracy.
 * Adheres to the Vance Mandate: Professional, cinematic, and informative.
 */
class ActionProvider {
  private createChatBotMessage: ActionProviderDeps['createChatBotMessage'];
  private setState: ActionProviderDeps['setState'];
  private content: SiteContent;

  constructor(
    createChatBotMessage: ActionProviderDeps['createChatBotMessage'],
    setState: ActionProviderDeps['setState'],
    _createClientMessage: unknown,
    _stateRef: unknown,
    _createCustomMessage: unknown,
    content: SiteContent
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setState;
    this.content = content;
  }

  private addMessages(messages: unknown[]): void {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...messages],
    }));
  }

  /**
   * Welcoming the user with studio philosophy.
   */
  handleGreeting = (): void => {
    const { brand } = this.content.common;
    this.addMessages([
      this.createChatBotMessage(
        `Greetings. Welcome to ${brand.name}, where we specialize in capturing the ${this.content.home.hero.titlePart2.toLowerCase()} of pure art.`,
        {}
      ),
      this.createChatBotMessage(
        "I am here to guide you through our collections, service tiers, or the studio's artistic philosophy. How may I assist your vision today?",
        { 
          widget: 'quickReplies',
          props: {
            replies: [
              { label: 'View Portfolio', handler: 'handlePortfolio' },
              { label: 'See Pricing', handler: 'handlePackages' },
              { label: 'Erika\'s Vision', handler: 'handleAbout' }
            ]
          },
          delay: 500 
        }
      ),
    ]);
  };

  /**
   * Handling booking intent by guiding through services first.
   */
  handleBook = (): void => {
    this.addMessages([
      this.createChatBotMessage(
        "Beginning a creative journey with Erika requires careful alignment of vision and technique. To view our full service tiers and begin your reservation, please explore our official packages:",
        {}
      ),
      this.createChatBotMessage(
        "Our official service list and booking portal:",
        { 
          widget: 'serviceLinkWidget',
          delay: 600 
        }
      ),
    ]);
  };

  /**
   * Displaying portfolio details and categories.
   */
  handlePortfolio = (): void => {
    const { portfolio } = this.content;
    this.addMessages([
      this.createChatBotMessage(
        `${portfolio.description} Every frame is meticulously composed to tell a high-impact story.`,
        {}
      ),
      this.createChatBotMessage(
        "I suggest browsing our curated series to witness our cinematic precision firsthand:",
        { 
          widget: 'portfolioWidget', 
          delay: 500 
        }
      ),
      this.createChatBotMessage(
        "After exploring, shall we discuss our investment tiers or our creative philosophy?",
        {
          widget: 'quickReplies',
          props: {
            replies: [
              { label: 'Investment Tiers', handler: 'handlePackages' },
              { label: 'Creative Vision', handler: 'handleAbout' }
            ]
          },
          delay: 1000
        }
      )
    ]);
  };

  /**
   * Detailed package information with pricing logic.
   */
  handlePackages = (): void => {
    const { packages } = this.content;
    const packageInfo = packages.items
      .map((p) => `\n✨ **${p.name}** (${p.price})\n${p.features.slice(0, 3).map(f => `  - ${f}`).join('\n')}`)
      .join('\n');

    this.addMessages([
      this.createChatBotMessage(
        `${packages.description} We offer a range of tiers from essential noir to full cinematic experiences.`,
        {}
      ),
      this.createChatBotMessage(
        `Our current investment tiers include:${packageInfo}\n\nFor unique requirements, our **${packages.bespoke.title}** provides ${packages.bespoke.description.toLowerCase()}`,
        { delay: 400 }
      ),
      this.createChatBotMessage(
        "You can view the full breakdown and feature lists on our dedicated services page:",
        { 
          widget: 'serviceLinkWidget',
          delay: 800 
        }
      ),
    ]);
  };

  /**
   * Bio and studio details.
   */
  handleAbout = (): void => {
    const { about, stats } = this.content.home;
    const experience = stats.find(s => s.label === "Experience")?.value || "12 Years";
    
    this.addMessages([
      this.createChatBotMessage(
        `${about.text}\n\nErika brings over ${experience} of refined artistry to the lens, heavily influenced by vintage Asian aesthetics and cinematic storytelling.`,
        {}
      ),
      this.createChatBotMessage(
        "The studio is located in a private, high-end facility and operates strictly by appointment to ensure undivided creative focus for every client.",
        { 
          widget: 'quickReplies',
          props: {
            replies: [
              { label: 'Our Process', handler: 'handlePhilosophy' },
              { label: 'View Services', handler: 'handlePackages' }
            ]
          },
          delay: 600 
        }
      ),
    ]);
  };

  /**
   * New: Detailed studio philosophy and process.
   */
  handlePhilosophy = (): void => {
    this.addMessages([
      this.createChatBotMessage(
        "Our process is as much about psychological comfort as it is about technical excellence. Every session begins with a visual consultation to align our artistic direction.",
        {}
      ),
      this.createChatBotMessage(
        "We prioritize atmosphere and lighting to capture what Erika calls 'The Silent Narrative'. Would you like to see how this translates into our pricing tiers?",
        {
          widget: 'quickReplies',
          props: {
            replies: [
              { label: 'Yes, See Pricing', handler: 'handlePackages' },
              { label: 'No, See Portfolio', handler: 'handlePortfolio' }
            ]
          },
          delay: 800
        }
      )
    ]);
  };

  /**
   * Intelligent fallback that stays in-character.
   */
  handleFallback = (): void => {
    this.addMessages([
      this.createChatBotMessage(
        "I apologize if my previous response was imprecise. To ensure I provide the most exquisite guidance, could you specify if you are interested in our pricing tiers, artistic portfolio, or Erika's studio vision?",
        {
          widget: 'quickReplies',
          props: {
            replies: [
              { label: 'Pricing', handler: 'handlePackages' },
              { label: 'Portfolio', handler: 'handlePortfolio' },
              { label: 'Studio Vision', handler: 'handleAbout' }
            ]
          }
        }
      ),
    ]);
  };
}

export default ActionProvider;
