import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Building2, Users, Compass } from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardProps {
  onConsult: () => void;
}

export function Dashboard({ onConsult }: DashboardProps) {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showEmergencyText, setShowEmergencyText] = useState(false);

  useEffect(() => {
    // This is a simulation of the "Emergency" state
    // In a real app, this might be triggered by a specific route or state
  }, []);

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setTimeout(() => setShowEmergencyText(true), 2000);
  };

  if (isEmergencyActive) {
    return (
      <div className="fixed inset-0 z-[60] bg-primary-container flex flex-col items-center justify-center p-6 text-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative flex items-center justify-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-32 h-32 bg-emerald-400/40 rounded-full"
          />
          <div className="relative z-10 w-24 h-24 bg-emerald-500 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.4)] flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-16 h-16 bg-emerald-400 rounded-full"
            />
          </div>
        </motion.div>
        
        <AnimatePresence>
          {showEmergencyText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-headline font-bold tracking-tight">Contacting a lawyer now</h2>
              <p className="text-on-primary-container text-sm opacity-80">Connecting you to the nearest available professional...</p>
              <button 
                onClick={() => { setIsEmergencyActive(false); setShowEmergencyText(false); }}
                className="mt-8 px-6 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Cancel Request
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary-container p-8 text-on-primary editorial-shadow">
        <div className="relative z-10 space-y-4">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase">Emergency Access</span>
          <h1 className="text-3xl font-headline font-extrabold leading-tight tracking-tight">Need a lawyer now?</h1>
          <p className="text-on-primary-container text-sm leading-relaxed max-w-[240px]">Get connected to a certified legal professional in under 120 seconds.</p>
          <button 
            onClick={onConsult}
            className="mt-4 bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95"
          >
            Consult an Expert
            <ArrowRight size={16} />
          </button>
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
          <img 
            alt="Legal authority" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400" 
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Pro-bono Request Form */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h2 className="text-xl font-headline font-bold text-primary">Request Pro-bono Case</h2>
          <span className="text-xs text-on-surface-variant font-medium">Free Legal Aid</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl space-y-5 shadow-[0_8px_32px_rgba(14,59,46,0.04)]">
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant ml-1">Case Category</label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border-none rounded-2xl px-5 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary-fixed-dim transition-all outline-none">
                <option>Civil Rights & Liberties</option>
                <option>Family Law & Support</option>
                <option>Labor & Employment</option>
                <option>Immigration Status</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant ml-1">Brief Description</label>
            <input 
              className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-on-surface font-medium placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary-fixed-dim transition-all outline-none" 
              placeholder="State your primary concern..." 
              type="text" 
            />
          </div>
          <button className="w-full bg-secondary-container text-on-secondary-fixed-variant font-bold py-4 rounded-2xl transition-all hover:bg-secondary-fixed active:scale-[0.98]">
            Submit Application
          </button>
        </div>
      </section>

      {/* Legal Topics Bento Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-headline font-bold text-primary">Legal Topics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-[0_8px_32px_rgba(14,59,46,0.04)] flex flex-col justify-between h-40 group cursor-pointer transition-all hover:translate-y-[-2px]">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm">Corporate</h3>
              <p className="text-[11px] text-on-surface-variant">Entity formation & IPOs</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-[0_8px_32px_rgba(14,59,46,0.04)] flex flex-col justify-between h-40 group cursor-pointer transition-all hover:translate-y-[-2px]">
            <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm">Estate Planning</h3>
              <p className="text-[11px] text-on-surface-variant">Wills, trusts & inheritance</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border-2 border-dashed border-outline-variant/30 flex flex-col justify-between h-40 cursor-pointer hover:bg-surface-container-low transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant">
              <Compass size={24} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-sm">Browse All</h3>
              <ArrowRight size={16} className="-rotate-45" />
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-40 shadow-[0_8px_32px_rgba(14,59,46,0.04)] group">
            <img 
              alt="Library" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="font-headline font-bold text-sm">Resources</h3>
              <p className="text-[10px] opacity-70">Legal Research Portal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
