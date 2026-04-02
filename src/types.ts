export type Tab = 'home' | 'chat' | 'emergency' | 'cases' | 'lawyers';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  imageUrl: string;
  featured?: boolean;
  bio: string;
  tags: string[];
}

export interface Case {
  id: string;
  title: string;
  status: 'In Discovery' | 'Hearing Scheduled' | 'Drafting' | 'Concluded';
  updatedAt: string;
  counsel: string;
  counselIcon: string;
}
