import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, ShieldCheck, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getLegalAdvice } from '../services/gemini';
import { Message } from '../types';
import { cn } from '../lib/utils';

export function Welcome() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to Digital Chambers. I am your AI legal navigator. I can help clarify complex legal jargon, explain tenant rights, or guide you through the initial steps of filing a claim.",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.content }]
    }));

    const response = await getLegalAdvice(input, history);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-6 pt-24 pb-40">
      {/* Welcome Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_8px_32px_rgba(14,59,46,0.04)] border border-outline-variant/15 mb-10"
      >
        <h2 className="font-headline font-bold text-2xl text-primary mb-4">Welcome to Digital Chambers</h2>
        <p className="text-on-surface-variant leading-relaxed mb-6">
          I am your AI legal navigator. I can help clarify complex legal jargon, explain tenant rights, or guide you through the initial steps of filing a claim.
        </p>
        <div className="flex items-center gap-2 text-primary-container font-semibold text-sm">
          <ShieldCheck size={16} />
          SECURE ENCRYPTED CONSULTATION
        </div>
      </motion.div>

      {/* Common Inquiries */}
      {messages.length === 1 && (
        <section className="mb-10">
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant/60 mb-4 px-2">Common Inquiries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'What are my tenant rights?', icon: 'home_work' },
              { label: 'How do I file a claim?', icon: 'description' },
              { label: 'Employment contract review', icon: 'work' },
              { label: 'Small claims procedure', icon: 'gavel' },
            ].map((item) => (
              <button 
                key={item.label}
                onClick={() => { setInput(item.label); handleSend(); }}
                className="flex items-center gap-4 p-5 bg-surface-container-low hover:bg-secondary-container transition-colors duration-300 rounded-xl text-left group"
              >
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-primary-container">
                    {item.label.includes('tenant') ? 'home_work' : 
                     item.label.includes('claim') ? 'description' : 
                     item.label.includes('contract') ? 'work' : 'gavel'}
                  </span>
                </div>
                <span className="font-semibold text-on-secondary-fixed-variant">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Chat Area */}
      <div className="space-y-6 flex-1">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex",
                message.role === 'user' ? "justify-end ml-12" : "justify-start mr-12"
              )}
            >
              <div
                className={cn(
                  "p-5 rounded-lg shadow-sm",
                  message.role === 'user' 
                    ? "bg-primary-container text-on-primary rounded-br-none" 
                    : "bg-secondary-container text-on-secondary-container rounded-bl-none"
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={18} className="text-primary" />
                    <span className="font-headline font-bold text-primary">Legal Assistant</span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none prose-emerald">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start mr-12">
            <div className="bg-secondary-container text-on-secondary-container p-5 rounded-lg rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Dock */}
      <div className="fixed bottom-28 left-0 w-full px-6 z-30">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-outline-variant/10 p-2 flex items-center gap-2">
          <button className="p-3 text-secondary hover:text-primary transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface text-sm px-2 outline-none"
            placeholder="Describe your legal concern..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-primary-container text-on-primary p-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
