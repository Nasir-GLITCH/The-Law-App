import { motion } from 'motion/react';
import { Landmark, Clock, ChevronRight, Plus, User, Gavel, History } from 'lucide-react';
import { Case } from '../types';
import { cn } from '../lib/utils';

const cases: Case[] = [
  {
    id: '1',
    title: 'Commonwealth vs. Arasaka',
    status: 'In Discovery',
    updatedAt: '2 hours ago',
    counsel: 'Elena Rodriguez',
    counselIcon: 'person'
  },
  {
    id: '2',
    title: 'Peterson Liability Claim',
    status: 'Hearing Scheduled',
    updatedAt: 'Oct 12, 2023',
    counsel: 'Marcus Thorne',
    counselIcon: 'gavel'
  },
  {
    id: '3',
    title: 'Vance Estate Trust',
    status: 'Drafting',
    updatedAt: 'Oct 10, 2023',
    counsel: 'Sarah Chen',
    counselIcon: 'history_edu'
  }
];

export function CaseManagement() {
  return (
    <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto space-y-8">
      {/* Summary Card */}
      <section className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-primary-container rounded-xl p-8 text-on-primary-container relative overflow-hidden shadow-2xl shadow-emerald-900/10">
          <div className="relative z-10">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-on-primary-container/60 mb-2">Legal Portfolio</p>
            <h2 className="font-headline text-4xl font-extrabold text-white mb-6">Case Summary</h2>
            <div className="flex gap-12">
              <div>
                <p className="text-white text-3xl font-bold">14</p>
                <p className="text-sm opacity-70">Active Files</p>
              </div>
              <div>
                <p className="text-white text-3xl font-bold">08</p>
                <p className="text-sm opacity-70">Pending Action</p>
              </div>
            </div>
          </div>
          {/* Abstract Design Element */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute right-12 top-12 opacity-10">
            <Landmark size={96} />
          </div>
        </div>
      </section>

      {/* Tab Selector */}
      <nav className="flex p-1 bg-surface-container-low rounded-full">
        <button className="flex-1 py-3 text-sm font-semibold rounded-full bg-surface-container-lowest shadow-sm text-primary">
          Ongoing
        </button>
        <button className="flex-1 py-3 text-sm font-semibold text-on-surface-variant">
          Concluded
        </button>
      </nav>

      {/* Cases List */}
      <section className="space-y-4">
        {cases.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_32px_rgba(14,59,46,0.04)] border-none"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-headline text-xl font-bold text-primary tracking-tight">{item.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                  <Clock size={12} />
                  Updated {item.updatedAt}
                </p>
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                item.status === 'In Discovery' ? "bg-secondary-container text-on-secondary-fixed-variant" :
                item.status === 'Hearing Scheduled' ? "bg-primary-fixed text-on-primary-fixed-variant" :
                "bg-surface-container-highest text-on-surface-variant"
              )}>
                {item.status}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                  {item.counselIcon === 'person' ? <User size={18} /> : 
                   item.counselIcon === 'gavel' ? <Gavel size={18} /> : 
                   <History size={18} />}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">Counsel</p>
                  <p className="text-sm font-medium text-primary">{item.counsel}</p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
                <ChevronRight size={20} className="text-primary" />
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* FAB */}
      <div className="fixed right-6 bottom-28 z-50">
        <button className="bg-primary-container text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-emerald-900/30 active:scale-95 transition-transform">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
