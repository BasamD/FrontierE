export interface BusinessInfo {
  id: string;
  address: string;
  phone: string;
  email: string;
  is_active: boolean;
}

export interface Sale {
  id: string;
  title: string;
  dates: string;
  location: string;
  description: string;
  image_url?: string;
  status: 'upcoming' | 'active' | 'completed';
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url?: string;
}

export interface SocialLinks {
  id: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  is_active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  read: boolean;
}