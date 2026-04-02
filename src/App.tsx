import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, User, MessageSquare, Send, ChevronRight, Phone, MapPin, Briefcase, ShieldCheck } from 'lucide-react';
import { Tab, Lawyer } from './types';
import { BottomNav } from './components/BottomNav';
import { Welcome } from './components/Welcome';
import { Directory, lawyers } from './components/Directory';
import { CaseManagement } from './components/CaseManagement';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onConsult={() => setActiveTab('lawyers')} />;
      case 'chat':
        return <Welcome />;
      case 'emergency':
        return <EmergencyScreen onBack={() => setActiveTab('home')} />;
      case 'cases':
        return <CaseManagement />;
      case 'lawyers':
        return <Directory />;
      default:
        return <Dashboard onConsult={() => setActiveTab('lawyers')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full glassmorphism z-50 flex justify-between items-center px-6 h-16 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3">
          <Scale className="text-primary" size={24} />
          <h1 className="text-lg font-extrabold tracking-[0.2em] text-primary font-headline">THE LAW</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border border-white/20 text-primary">
          <User size={24} />
        </div>
      </header>

      <main className="relative min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Chat Button */}
      {activeTab !== 'chat' && activeTab !== 'emergency' && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setActiveTab('chat')}
          className="fixed right-6 bottom-44 z-50 bg-primary-container text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95"
        >
          <MessageSquare size={24} />
        </motion.button>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

function EmergencyScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'pulsing' | 'form' | 'success'>('pulsing');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    caseType: 'Criminal'
  });
  const [assignedLawyer, setAssignedLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    if (step === 'pulsing') {
      const timer = setTimeout(() => setStep('form'), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomLawyer = lawyers[Math.floor(Math.random() * lawyers.length)];
    setAssignedLawyer(randomLawyer);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-primary-container flex flex-col items-center justify-center p-6 text-white overflow-y-auto">
      <AnimatePresence mode="wait">
        {step === 'pulsing' && (
          <motion.div
            key="pulsing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative flex items-center justify-center mb-12">
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
            </div>
            <h2 className="text-2xl font-headline font-bold tracking-tight mb-4">Contacting a lawyer now</h2>
            <p className="text-on-primary-container text-sm opacity-80 mb-8">Connecting you to the nearest available professional...</p>
            <button 
              onClick={onBack}
              className="px-6 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Cancel Request
            </button>
          </motion.div>
        )}

        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md bg-white rounded-3xl p-8 text-on-surface shadow-2xl my-8"
          >
            <h2 className="text-2xl font-headline font-bold text-primary mb-2">Urgent Intake</h2>
            <p className="text-on-surface-variant text-sm mb-6">Please provide your details for immediate assistance.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input 
                    required
                    className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-fixed-dim outline-none text-on-surface"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Current Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input 
                    required
                    className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-fixed-dim outline-none text-on-surface"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input 
                    required
                    type="tel"
                    className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-fixed-dim outline-none text-on-surface"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Case Type</label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <select 
                    className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-fixed-dim outline-none appearance-none text-on-surface"
                    value={formData.caseType}
                    onChange={e => setFormData({...formData, caseType: e.target.value})}
                  >
                    <option>Criminal</option>
                    <option>Family</option>
                    <option>Real Estate</option>
                    <option>Corporate</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary-container text-white font-bold py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Find My Lawyer
                <Send size={18} />
              </button>
            </form>
            
            <button 
              onClick={onBack}
              className="w-full mt-4 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              Cancel Request
            </button>
          </motion.div>
        )}

        {step === 'success' && assignedLawyer && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-8 text-on-surface shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-2xl font-headline font-bold text-primary mb-2">Lawyer has been contacted</h2>
            <p className="text-on-surface-variant text-sm mb-8">Your emergency request has been prioritized.</p>
            
            <div className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-4 text-left mb-8">
              <img 
                src={assignedLawyer.imageUrl} 
                alt={assignedLawyer.name} 
                className="w-16 h-16 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-primary">{assignedLawyer.name}</h4>
                <p className="text-xs text-on-surface-variant">{assignedLawyer.specialty}</p>
                <div className="flex items-center gap-1 mt-1 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                  <motion.div 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                  Online Now
                </div>
              </div>
            </div>

            <button 
              onClick={onBack}
              className="w-full bg-primary-container text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Return to Dashboard
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
