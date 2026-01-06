
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ru' | 'uz';

export interface LocalizedString {
  en: string;
  ru: string;
  uz: string;
}

/**
 * Added to fix errors in constants.ts where this type was expected but missing
 */
export interface Expert {
  id: string;
  name: string;
  department: string;
  expertise: string;
  image: string;
}

/**
 * Added to fix errors in constants.ts where this type was expected but missing
 */
export interface MultimediaItem {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: LocalizedString;
  parentCategoryId: string;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  subcategories: Subcategory[];
}

export interface Tag {
  id: string;
  slug: string;
  label: string;
}

export interface Person {
  id: string;
  type: 'professor' | 'student';
  name: string;
  title?: string; // e.g. "Senior Lecturer"
  department?: string;
  faculty?: string;
  year?: string; // For students
  photoUrl: string;
  bio: LocalizedString;
  contacts: {
    email?: string;
    phone?: string;
    office?: string;
  };
  socials: {
    twitter?: string;
    linkedin?: string;
    scholar?: string;
  };
}

/**
 * Updated to support both the localized structure and the legacy string-based mock data format
 * to fix errors in constants.ts and UI components.
 */
export interface NewsArticle {
  id: string;
  slug?: string;
  title: LocalizedString | string;
  summary?: LocalizedString | string;
  content?: LocalizedString | string;
  coverUrl?: string;
  image?: string; // Added for backward compatibility with MOCK_NEWS
  galleryUrls?: string[];
  categoryId?: string;
  category?: string; // Added for backward compatibility with MOCK_NEWS
  subcategoryId?: string;
  tagIds?: string[];
  professorIds?: string[];
  studentIds?: string[];
  author?: string;
  date?: string; // Added for backward compatibility with MOCK_NEWS
  excerpt?: string; // Added for backward compatibility with MOCK_NEWS
  status?: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  updatedAt?: string;
  viewCount?: number;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'press';
  title: LocalizedString;
  url: string; // Video URL or high-res image
  thumbUrl: string;
  tagIds: string[];
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'content_manager';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
