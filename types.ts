
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
}

export type Theme = 'dark' | 'light';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
