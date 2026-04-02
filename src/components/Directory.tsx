import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Star, Bookmark, ArrowRight, Briefcase, Users, Scale, Building2 } from 'lucide-react';
import { Lawyer } from '../types';
import { cn } from '../lib/utils';

export const lawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Jonathan Thorne, Esq.',
    specialty: 'Senior Partner • Corporate Mergers',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 450,
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256',
    featured: true,
    bio: 'Specializing in high-stakes litigation and international corporate restructuring with over 15 years of bench experience.',
    tags: ['Arbitration', 'IP Law', 'Compliance']
  },
  {
    id: '2',
    name: 'Elena Rossi',
    specialty: 'Family & Estate Planning',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 250,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256',
    bio: 'Expert in complex family disputes and high-net-worth estate planning.',
    tags: ['Divorce', 'Wills', 'Trusts']
  },
  {
    id: '3',
    name: 'Marcus Chen',
    specialty: 'Real Estate & Tech IP',
    rating: 4.7,
    reviews: 56,
    hourlyRate: 310,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
    bio: 'Navigating the intersection of property law and digital intellectual property.',
    tags: ['Conveyancing', 'Patents', 'Startups']
  }
];

const specialties = [
  { id: 'corporate', label: 'Corporate', icon: Briefcase },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'criminal', label: 'Criminal', icon: Scale },
  { id: 'real-estate', label: 'Real Estate', icon: Building2 },
];

export function Directory() {
  return (
    <div className="pt-24 pb-40 px-6 max-w-5xl mx-auto">
      {/* Search and Filter Section */}
      <section className="mb-10">
        <h2 className="font-headline text-3xl font-bold text-primary-container mb-6 tracking-tight leading-tight">
          Find Sovereign <br/><span className="text-on-primary-container">Legal Counsel.</span>
        </h2>
        <div className="relative flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={20} />
            <input 
              className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-xl shadow-[0_8px_32px_rgba(14,59,46,0.04)] focus:ring-2 focus:ring-primary-fixed-dim transition-all outline-none" 
              placeholder="Search by name or specialty..." 
              type="text" 
            />
          </div>
          <button className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_8px_32px_rgba(14,59,46,0.04)] hover:bg-secondary-container transition-colors duration-300">
            <SlidersHorizontal className="text-primary-container" size={20} />
          </button>
        </div>
      </section>

      {/* Category Horizontal Scroll */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface-variant/70">Specialties</h3>
          <button className="text-xs font-semibold text-primary underline underline-offset-4">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            return (
              <button 
                key={spec.id}
                className={cn(
                  "flex-shrink-0 px-6 py-3 rounded-full flex items-center gap-3 transition-colors cursor-pointer",
                  spec.id === 'corporate' 
                    ? "bg-primary-container text-on-primary" 
                    : "bg-surface-container-lowest text-on-surface-variant hover:bg-secondary-container"
                )}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{spec.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Lawyers Directory */}
      <section className="space-y-6">
        {lawyers.map((lawyer) => (
          <motion.div 
            key={lawyer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_32px_rgba(14,59,46,0.06)] relative overflow-hidden group",
              lawyer.featured && "md:col-span-2"
            )}
          >
            {lawyer.featured && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            )}
            <div className={cn("flex flex-col gap-6 relative z-10", lawyer.featured ? "md:flex-row" : "flex-row")}>
              <div className={cn("rounded-xl overflow-hidden flex-shrink-0", lawyer.featured ? "w-24 h-24 md:w-32 md:h-32" : "w-16 h-16")}>
                <img 
                  alt={lawyer.name} 
                  className="w-full h-full object-cover" 
                  src={lawyer.imageUrl} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {lawyer.featured && (
                        <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded uppercase tracking-wider">Featured</span>
                      )}
                      <div className="flex items-center text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold ml-1">{lawyer.rating} ({lawyer.reviews} reviews)</span>
                      </div>
                    </div>
                    <h4 className={cn("font-headline font-bold text-primary-container", lawyer.featured ? "text-xl" : "text-base")}>{lawyer.name}</h4>
                    <p className="text-on-surface-variant text-sm font-medium italic">{lawyer.specialty}</p>
                  </div>
                  <button className="text-outline hover:text-primary transition-colors">
                    <Bookmark size={20} />
                  </button>
                </div>
                {lawyer.featured && (
                  <p className="text-on-surface-variant text-sm mb-6 max-w-lg leading-relaxed">{lawyer.bio}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-6">
                  {lawyer.tags.map(tag => (
                    <span key={tag} className="text-[11px] bg-surface-container-low px-3 py-1 rounded-full text-on-secondary-fixed-variant font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-outline-variant/10">
                  <span className="text-xs font-bold text-primary-container">${lawyer.hourlyRate} <span className="font-normal text-on-surface-variant">/ hr</span></span>
                  <button className="text-xs font-bold text-primary-container flex items-center gap-1 hover:opacity-70 transition-opacity">
                    View Profile <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
