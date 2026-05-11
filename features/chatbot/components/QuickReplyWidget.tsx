'use client';

/**
 * QuickReplyWidget — Molecule.
 * Renders a set of suggested follow-up questions as clickable chips.
 */
export default function QuickReplyWidget(props: { 
  actions: { [key: string]: () => void },
  replies: Array<{ label: string; handler: string }> 
}) {
  const { actions, replies } = props;

  return (
    <div className="chatbot-widget-area mt-2 mb-1 flex flex-wrap gap-2">
      {replies.map((reply) => (
        <button
          key={reply.label}
          onClick={() => {
            const handler = actions[reply.handler];
            if (handler) handler();
          }}
          className="chatbot-chip hover:bg-accent/20 transition-all"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}
