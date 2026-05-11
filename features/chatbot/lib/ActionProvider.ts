import { SiteContent } from '@/lib/types';

interface ActionProviderDeps {
  createChatBotMessage: (message: string, options?: { widget?: string; delay?: number }) => unknown;
  setState: React.Dispatch<React.SetStateAction<{ messages: unknown[] }>>;
  children: React.ReactNode;
}

/**
 * ActionProvider — Context-aware response engine.
 * All responses reference real data from SiteContent to remain brand-accurate.
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

  handleGreeting = (): void => {
    const { brand } = this.content.common;
    this.addMessages([
      this.createChatBotMessage(
        `Greetings. ${brand.name} is dedicated to capturing your most authentic essence. What aspect of our studio can I illuminate for you?`,
        {}
      ),
    ]);
  };

  handleBook = (): void => {
    this.addMessages([
      this.createChatBotMessage(
        'I would be delighted to arrange your session. Erika personally reviews every inquiry to ensure a perfect creative alignment.',
        {}
      ),
      this.createChatBotMessage(
        'Please proceed to our reservation form:',
        { widget: 'bookingWidget', delay: 400 }
      ),
    ]);
  };

  handlePortfolio = (): void => {
    const { portfolio } = this.content;
    this.addMessages([
      this.createChatBotMessage(
        `${portfolio.description} Each collection reflects a distinct artistic vision.`,
        {}
      ),
      this.createChatBotMessage(
        'Explore our curated series:',
        { widget: 'portfolioWidget', delay: 400 }
      ),
    ]);
  };

  handlePackages = (): void => {
    const { packages } = this.content;
    const packageList = packages.items
      .map((p) => `• ${p.name} — ${p.price}`)
      .join('\n');

    this.addMessages([
      this.createChatBotMessage(
        `${packages.description}\n\n${packageList}`,
        {}
      ),
      this.createChatBotMessage(
        'For bespoke brand campaigns or large productions, we offer fully custom arrangements. Shall I connect you with our booking form?',
        { delay: 500 }
      ),
    ]);
  };

  handleAbout = (): void => {
    const { about } = this.content.home;
    this.addMessages([
      this.createChatBotMessage(about.text, {}),
      this.createChatBotMessage(
        'Erika brings 12 years of refined artistic vision to every session — blending vintage aesthetics with modern cinematic precision.',
        { delay: 400 }
      ),
    ]);
  };

  handleFallback = (): void => {
    this.addMessages([
      this.createChatBotMessage(
        "I appreciate your inquiry. I am best equipped to assist with our portfolio, session packages, and booking arrangements. How may I refine my response?",
        {}
      ),
    ]);
  };
}

export default ActionProvider;
