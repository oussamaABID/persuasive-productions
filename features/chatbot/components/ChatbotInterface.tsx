'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { SiteContent } from '@/lib/types';
import BookingWidget from '@/features/chatbot/components/BookingWidget';
import PortfolioWidget from '@/features/chatbot/components/PortfolioWidget';

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageType = 'bot' | 'user';
type WidgetType = 'bookingWidget' | 'portfolioWidget' | null;

interface ChatMsg {
  id: number;
  type: MessageType;
  text: string;
  widget: WidgetType;
}

// ─── Intent Engine (Client-side, reads SiteContent) ───────────────────────────

function buildResponder(content: SiteContent) {
  const { packages, home, portfolio } = content;
  const packageList = packages.items.map((p) => `• ${p.name} — ${p.price}`).join('\n');

  return function respond(input: string): { text: string; widget: WidgetType; followUp?: string } {
    const q = input.toLowerCase().trim();

    if (/hello|hi|hey|greet|good\s*(morning|afternoon|evening)/i.test(q)) {
      return {
        text: `Greetings. ${content.common.brand.name} is dedicated to capturing your most authentic essence. What aspect of our studio can I illuminate for you?`,
        widget: null,
      };
    }

    if (/book|session|schedule|reserve|appointment|call|meet/i.test(q)) {
      return {
        text: 'I would be delighted to arrange your session. Erika personally reviews every inquiry to ensure a perfect creative alignment. Please proceed to our reservation form:',
        widget: 'bookingWidget',
      };
    }

    if (/portfolio|work|gallery|collection|photo|image|shot|look/i.test(q)) {
      return {
        text: `${portfolio.description} Each collection reflects a distinct artistic vision. Explore our curated series:`,
        widget: 'portfolioWidget',
      };
    }

    if (/package|price|pricing|cost|rate|fee|service|offer|how much|\$/i.test(q)) {
      return {
        text: `${packages.description}\n\n${packageList}\n\nFor bespoke brand campaigns or large productions, we offer fully custom arrangements.`,
        widget: null,
        followUp: 'Shall I connect you with our booking form?',
      };
    }

    if (/about|erika|who|team|studio|vision|style/i.test(q)) {
      return {
        text: home.about.text,
        widget: null,
        followUp: 'Erika brings 12 years of refined artistic vision — blending vintage aesthetics with modern cinematic precision.',
      };
    }

    return {
      text: "I appreciate your inquiry. I am best equipped to assist with our portfolio, session packages, and booking arrangements. How may I refine my response?",
      widget: null,
    };
  };
}

// ─── Message Bubble Component ─────────────────────────────────────────────────

const BubbleVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function MessageBubble({ msg, index }: { msg: ChatMsg; index: number }) {
  return (
    <motion.div
      key={msg.id}
      variants={BubbleVariants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index === 0 ? 0 : 0.06,
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={msg.type === 'user' ? 'chatbot-user-bubble' : 'chatbot-bot-bubble'}
      style={{ whiteSpace: 'pre-line' }}
    >
      {msg.text}
    </motion.div>
  );
}

// ─── Widget Renderer ──────────────────────────────────────────────────────────

function WidgetArea({ widget }: { widget: WidgetType }) {
  if (!widget) return null;
  return (
    <motion.div
      variants={BubbleVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {widget === 'bookingWidget' && <BookingWidget />}
      {widget === 'portfolioWidget' && <PortfolioWidget />}
    </motion.div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      variants={BubbleVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      className="chatbot-bot-bubble flex items-center gap-1.5"
      aria-label="Bot is typing"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }}
        />
      ))}
    </motion.div>
  );
}

// ─── Main Interface ───────────────────────────────────────────────────────────

interface ChatbotInterfaceProps {
  content: SiteContent;
}

export default function ChatbotInterface({ content }: ChatbotInterfaceProps) {
  const respond = useCallback(buildResponder(content), [content]);

  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    // Hydrate from sessionStorage on mount (survives hard reloads within the tab)
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('pp_chat_messages');
        if (saved) return JSON.parse(saved) as ChatMsg[];
      } catch {
        // Corrupted storage — fall through to defaults
      }
    }
    return [
      {
        id: 0,
        type: 'bot',
        text: 'Welcome. I am the Studio Concierge for Persuasive Productions.',
        widget: null,
      },
      {
        id: 1,
        type: 'bot',
        text: 'I can assist you with our portfolio, packages, or booking a session with Erika. How may I serve you?',
        widget: null,
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist messages to sessionStorage whenever they change
  useEffect(() => {
    try {
      sessionStorage.setItem('pp_chat_messages', JSON.stringify(messages));
    } catch {
      // sessionStorage unavailable (private browsing quota exceeded) — silent fail
    }
  }, [messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMsg = {
      id: Date.now(),
      type: 'user',
      text,
      widget: null,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate human reading/thinking rhythm (600–900ms)
    const delay = 650 + Math.random() * 250;
    setTimeout(() => {
      const { text: responseText, widget, followUp } = respond(text);

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: 'bot', text: responseText, widget },
      ]);

      // Staggered follow-up message
      if (followUp) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, type: 'bot', text: followUp, widget: null },
          ]);
        }, 500);
      }
    }, delay);
  }, [input, isTyping, respond]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Message stream */}
      <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map((msg, i) => (
          <div key={msg.id}>
            <MessageBubble msg={msg} index={i} />
            <WidgetArea widget={msg.widget} />
          </div>
        ))}
        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input shell — pushed above mobile keyboard via env(safe-area-inset-bottom) */}
      <div className="chatbot-input-shell">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about portfolio, pricing, booking..."
          className="chatbot-input"
          aria-label="Chat input"
          maxLength={200}
          disabled={isTyping}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          className="chatbot-send-btn"
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>
    </>
  );
}
