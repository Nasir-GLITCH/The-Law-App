import { motion } from 'motion/react';
import { Home, MessageSquare, Scale, FolderOpen, User } from 'lucide-react';
import { Tab } from '../types';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: Tab; icon: typeof Home }[] = [
    { id: 'home', icon: Home },
    { id: 'chat', icon: MessageSquare },
    { id: 'emergency', icon: Scale },
    { id: 'cases', icon: FolderOpen },
    { id: 'lawyers', icon: User },
  ];

  return (
    <div className="fixed bottom-0 w-full flex justify-center pb-8 z-50 pointer-events-none">
      <nav className="pointer-events-auto glassmorphism w-[90%] max-w-md rounded-full px-4 py-3 flex justify-between items-center shadow-[0_8px_32px_rgba(14,59,46,0.06)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isEmergency = tab.id === 'emergency';

          if (isEmergency) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex items-center justify-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="pulse"
                    className="absolute w-12 h-12 bg-emerald-400/30 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <div
                  className={cn(
                    "relative z-10 p-3 rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-primary-container text-white scale-110 shadow-lg" 
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "p-3 rounded-full transition-all duration-300 flex flex-col items-center",
                isActive 
                  ? "bg-primary-fixed text-on-primary-fixed" 
                  : "text-on-surface-variant/60 hover:text-primary"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
