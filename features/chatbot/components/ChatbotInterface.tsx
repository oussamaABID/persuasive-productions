'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { SiteContent } from '@/lib/types';
import ServiceLinkWidget from '@/features/chatbot/components/ServiceLinkWidget';
import PortfolioWidget from '@/features/chatbot/components/PortfolioWidget';

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageType = 'bot' | 'user';
type WidgetType = 'serviceLinkWidget' | 'portfolioWidget' | 'quickReplies' | null;

interface ChatMsg {
  id: number;
  type: MessageType;
  text: string;
  widget: WidgetType;
  props?: Record<string, unknown>;
}

// ─── Intent Engine (Enhanced Logic) ──────────────────────────────────────────

function buildResponder(content: SiteContent, collections: any[]) {
  const { packages, home } = content;
  const packageList = packages.items.map((p) => `• **${p.name}** — ${p.price}`).join('\n');

  return function respond(input: string): { text: string; widget: WidgetType; props?: Record<string, unknown>; followUp?: string } {
    const q = input.toLowerCase().trim();

    // Greeting
    if (/\b(hi|hello|hey|greetings|bonjour|welcome)\b/i.test(q)) {
      return {
        text: `Greetings. Welcome to ${content.common.brand.name}, where we specialize in capturing the essence of pure art.`,
        widget: 'quickReplies',
        props: {
          replies: [
            { label: 'View Portfolio', id: 'portfolio' },
            { label: 'See Pricing', id: 'pricing' },
            { label: 'Our Philosophy', id: 'about' }
          ]
        }
      };
    }

    // Portfolio & Specific Collections
    const collectionMatch = collections.find(c => q.includes(c.id) || q.includes(c.title.toLowerCase()));
    if (collectionMatch || /\b(portfolio|work|gallery|collection|photos|images|shots|see)\b/i.test(q) || q === 'portfolio') {
      const text = collectionMatch 
        ? `The **${collectionMatch.title}** collection is ${collectionMatch.description.toLowerCase()} You can find it in our signature portfolio.`
        : `${content.portfolio.description} Every frame is meticulously composed to tell a high-impact story.`;
      
      return {
        text,
        widget: 'portfolioWidget',
        followUp: "Shall we discuss our investment tiers or our artistic approach next?"
      };
    }

    // Pricing/Packages
    if (/\b(package|price|pricing|cost|rate|fee|service|offer|how much|\$|investment)\b/i.test(q) || q === 'pricing') {
      return {
        text: `${packages.description}\n\n${packageList}\n\nFor bespoke requirements, our **${packages.bespoke.title}** provides ${packages.bespoke.description.toLowerCase()}`,
        widget: 'serviceLinkWidget',
        followUp: "You can view the full details and start your booking on our official services page above."
      };
    }

    // About/Vision
    if (/\b(who|team|studio|vision|style|philosophy|approach)\b/i.test(q) || q === 'about') {
      return {
        text: `${home.about.text}\n\nOur team brings years of refined artistry, blending vintage aesthetics with modern cinematic precision.`,
        widget: 'quickReplies',
        props: {
          replies: [
            { label: 'View Services', id: 'pricing' },
            { label: 'See Work', id: 'portfolio' }
          ]
        }
      };
    }

    // Booking
    if (/\b(book|session|schedule|reserve|appointment|call|meet|hire)\b/i.test(q)) {
      return {
        text: "Beginning a creative journey with us requires careful alignment of vision. To view our full service tiers and begin your reservation, please explore our official packages:",
        widget: 'serviceLinkWidget',
        followUp: "Our official service list and booking portal is linked above."
      };
    }

    return {
      text: "I appreciate your inquiry. To provide the most exquisite guidance, would you like to explore our artistic portfolio, pricing tiers, or our creative philosophy?",
      widget: 'quickReplies',
      props: {
        replies: [
          { label: 'Portfolio', id: 'portfolio' },
          { label: 'Pricing', id: 'pricing' },
          { label: 'Philosophy', id: 'about' }
        ]
      }
    };
  };
}

// ─── Components ───────────────────────────────────────────────────────────────

interface QuickReply {
  id: string;
  label: string;
}

function QuickReplyWidget({ replies, onReply }: { replies: QuickReply[], onReply: (id: string) => void }) {
  return (
    <div className="chatbot-widget-area mt-2 mb-1 flex flex-wrap gap-2">
      {replies.map((reply) => (
        <button
          key={reply.id}
          onClick={() => onReply(reply.id)}
          className="chatbot-chip hover:bg-accent/20 transition-all"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}

const BubbleVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function MessageBubble({ msg, index }: { msg: ChatMsg; index: number }) {
  return (
    <motion.div
      variants={BubbleVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index === 0 ? 0 : 0.06, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={msg.type === 'user' ? 'chatbot-user-bubble' : 'chatbot-bot-bubble'}
      style={{ whiteSpace: 'pre-line' }}
    >
      {msg.text}
    </motion.div>
  );
}

export default function ChatbotInterface({ content, collections, onClose }: { content: SiteContent; collections: any[]; onClose?: () => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('studio_concierge_history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse chat history", e);
        }
      }
    }
    return [
      { id: 0, type: 'bot', text: 'Welcome. I am the Studio Concierge for Persuasive Productions.', widget: null },
      { id: 1, type: 'bot', text: 'I can assist you with our portfolio, packages, or our creative vision. How may I serve you?', widget: 'quickReplies', props: { replies: [{ label: 'Portfolio', id: 'portfolio' }, { label: 'Pricing', id: 'pricing' }, { label: 'Vision', id: 'about' }] } },
    ];
  });

  useEffect(() => {
    localStorage.setItem('studio_concierge_history', JSON.stringify(messages));
  }, [messages]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const respond = buildResponder(content, collections);

  const processResponse = useCallback((userInput: string) => {
    setIsTyping(true);
    const delay = 600 + Math.random() * 300;

    setTimeout(() => {
      const { text, widget, props, followUp } = respond(userInput);
      setIsTyping(false);
      
      const botMsg: ChatMsg = { id: Date.now(), type: 'bot', text, widget, props };
      setMessages((prev) => [...prev, botMsg]);

      if (followUp) {
        setTimeout(() => {
          setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: followUp, widget: 'quickReplies', props: { replies: [{ label: 'Pricing', id: 'pricing' }, { label: 'Vision', id: 'about' }] } }]);
        }, 500);
      }
    }, delay);
  }, [respond]);

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;
    const userMsg: ChatMsg = { id: Date.now(), type: 'user', text: input, widget: null };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    processResponse(currentInput);
  };

  return (
    <>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={msg.id}>
            <MessageBubble msg={msg} index={i} />
            {msg.widget === 'portfolioWidget' && <PortfolioWidget onClose={onClose} />}
            {msg.widget === 'serviceLinkWidget' && <ServiceLinkWidget onClose={onClose} />}
            {msg.widget === 'quickReplies' && !!msg.props?.replies && (
              <QuickReplyWidget 
                replies={msg.props.replies as QuickReply[]} 
                onReply={(id) => processResponse(id)} 
              />
            )}
          </div>
        ))}
        {isTyping && (
          <div className="chatbot-bot-bubble flex gap-1 items-center">
            <Sparkles size={10} className="animate-spin text-accent" />
            <span className="text-[10px] opacity-50">Studio thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chatbot-input-shell">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about portfolio, pricing..."
          className="chatbot-input"
        />
        <button onClick={sendMessage} className="chatbot-send-btn"><Send size={14} /></button>
      </div>
    </>
  );
}
