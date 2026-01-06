
import { Category, NewsArticle, Person, MediaItem, Tag, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'admin_uwed', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=admin' },
  { id: 'u2', username: 'editor_sarah', role: 'content_manager', avatar: 'https://i.pravatar.cc/150?u=editor' }
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-univ',
    slug: 'university',
    name: { en: 'University', ru: 'Университет', uz: 'Universitet' },
    subcategories: [
      { id: 'sub-prof', slug: 'professors', name: { en: 'Professors', ru: 'Профессора', uz: 'Professorlar' }, parentCategoryId: 'cat-univ' },
      { id: 'sub-stud', slug: 'students', name: { en: 'Students', ru: 'Студенты', uz: 'Talabalar' }, parentCategoryId: 'cat-univ' },
      { id: 'sub-evnt', slug: 'events', name: { en: 'Events', ru: 'События', uz: 'Tadbirlar' }, parentCategoryId: 'cat-univ' },
      { id: 'sub-res', slug: 'research', name: { en: 'Research', ru: 'Исследования', uz: 'Tadqiqotlar' }, parentCategoryId: 'cat-univ' }
    ]
  },
  { id: 'cat-pol', slug: 'politics', name: { en: 'Politics', ru: 'Политика', uz: 'Siyosat' }, subcategories: [] },
  { id: 'cat-econ', slug: 'economics', name: { en: 'Economics', ru: 'Экономика', uz: 'Iqtisodiyot' }, subcategories: [] },
  { id: 'cat-world', slug: 'world', name: { en: 'World', ru: 'Мир', uz: 'Dunyo' }, subcategories: [] }
];

export const MOCK_PEOPLE: Person[] = [
  {
    id: 'p1',
    type: 'professor',
    name: 'Dr. James Moriarty',
    title: 'Professor of International Law',
    department: 'Legal Studies',
    photoUrl: 'https://i.pravatar.cc/300?u=moriarty',
    bio: {
      en: 'A leading expert in diplomatic law with over 20 years of experience.',
      ru: 'Ведущий эксперт в области дипломатического права с более чем 20-летним опытом.',
      uz: 'Diplomatik huquq sohasida 20 yildan ortiq tajribaga ega yetakchi mutaxassis.'
    },
    contacts: { email: 'j.moriarty@uwed.uz', office: 'Building A, Room 304' },
    socials: { linkedin: '#', scholar: '#' }
  },
  {
    id: 'p2',
    type: 'professor',
    name: 'Dr. Elena Rossi',
    title: 'Senior Economist',
    department: 'Global Economics',
    photoUrl: 'https://i.pravatar.cc/300?u=elena_p',
    bio: {
      en: 'Specialist in Central Asian trade corridors and emerging markets.',
      ru: 'Специалист по торговым коридорам Центральной Азии и развивающимся рынкам.',
      uz: 'Markaziy Osiyo savdo koridorlari va rivojlanayotgan bozorlar boʻyicha mutaxassis.'
    },
    contacts: { email: 'e.rossi@uwed.uz' },
    socials: {}
  },
  {
    id: 's1',
    type: 'student',
    name: 'Elena Gilbert',
    faculty: 'International Relations',
    year: '4th Year',
    photoUrl: 'https://i.pravatar.cc/300?u=elena',
    bio: {
      en: 'President of the Student Union and passionate about global diplomacy.',
      ru: 'Президент студенческого союза, увлекается глобальной дипломатией.',
      uz: 'Talabalar uyushmasi prezidenti, global diplomatiyaga qiziqadi.'
    },
    contacts: { email: 'e.gilbert@student.uwed.uz' },
    socials: {}
  }
];

export const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: 'a1',
    slug: 'new-diplomacy-hub-opens',
    title: { en: 'UWED Opens Advanced Diplomacy Hub', ru: 'УМЭД открывает центр передовой дипломатии', uz: 'JIDU ilg\'or diplomatiya markazini ochdi' },
    summary: { en: 'A new center for digital diplomacy and international research inaugurated.', ru: 'Открыт новый центр цифровой дипломатии.', uz: 'Yangi diplomatiya markazi ochildi.' },
    content: { en: 'Full content...', ru: 'Полный текст...', uz: 'To\'liq matn...' },
    coverUrl: 'https://picsum.photos/1200/800?random=1',
    categoryId: 'cat-univ',
    subcategoryId: 'sub-res',
    tagIds: ['tag-innovation'],
    professorIds: ['p1'],
    author: 'Admin',
    status: 'published',
    publishedAt: '2024-05-10T10:00:00Z',
    viewCount: 1245
  },
  {
    id: 'a2',
    slug: 'global-economy-trends',
    title: { en: 'Emerging Trends in Silk Road Trade', ru: 'Тенденции торговли на Шелковом пути', uz: 'Ipak yo\'li savdosidagi yangi tendentsiyalar' },
    summary: { en: 'How Central Asia is becoming a global logistics hub.', ru: 'Как Центральная Азия становится логистическим хабом.', uz: 'Markaziy Osiyo qanday qilib logistika markaziga aylanmoqda.' },
    content: { en: '...', ru: '...', uz: '...' },
    coverUrl: 'https://picsum.photos/1200/800?random=2',
    categoryId: 'cat-econ',
    tagIds: ['tag-diplomacy'],
    professorIds: ['p2'],
    author: 'Elena Rossi',
    status: 'published',
    publishedAt: '2024-05-12T09:00:00Z',
    viewCount: 2300
  },
  {
    id: 'a3',
    slug: 'student-tech-summit',
    title: { en: 'Students Organize First AI in Diplomacy Summit', ru: 'Студенты организовали саммит ИИ в дипломатии', uz: 'Talabalar diplomatiyada AI sammitini tashkil qilishdi' },
    summary: { en: 'A weekend of innovation and policy discussion.', ru: 'Выходные инноваций и дискуссий.', uz: 'Innovatsiyalar va siyosiy munozaralar haftasi.' },
    content: { en: '...', ru: '...', uz: '...' },
    coverUrl: 'https://picsum.photos/1200/800?random=3',
    categoryId: 'cat-univ',
    subcategoryId: 'sub-stud',
    tagIds: ['tag-students'],
    studentIds: ['s1'],
    author: 'Editor',
    status: 'published',
    publishedAt: '2024-05-14T09:00:00Z',
    viewCount: 540
  },
  {
    id: 'a4',
    slug: 'un-speech-2024',
    title: { en: 'UWED Delegation at the UN General Assembly', ru: 'Делегация УМЭД на Генассамблее ООН', uz: 'JIDU delegatsiyasi BMT Bosh Assambleyasida' },
    summary: { en: 'Our representatives discussed regional security in New York.', ru: 'Наши представители обсудили безопасность в Нью-Йорке.', uz: 'Vakillarimiz Nyu-Yorkda mintaqaviy xavfsizlikni muhokama qilishdi.' },
    content: { en: '...', ru: '...', uz: '...' },
    coverUrl: 'https://picsum.photos/1200/800?random=4',
    categoryId: 'cat-pol',
    tagIds: ['tag-diplomacy'],
    author: 'Admin',
    status: 'published',
    publishedAt: '2024-05-15T11:00:00Z',
    viewCount: 3100
  }
];

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: 'm1',
    type: 'video',
    title: { en: 'Campus Life Highlights', ru: 'Жизнь кампуса', uz: 'Kampus hayoti' },
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbUrl: 'https://picsum.photos/800/600?random=50',
    tagIds: ['tag-event'],
    createdAt: '2024-05-15T15:00:00Z'
  },
  {
    id: 'm2',
    type: 'photo',
    title: { en: 'Summer Graduation 2024', ru: 'Выпускной 2024', uz: 'Bitiruv 2024' },
    url: 'https://picsum.photos/1200/800?random=51',
    thumbUrl: 'https://picsum.photos/800/600?random=51',
    tagIds: ['tag-event'],
    createdAt: '2024-05-16T15:00:00Z'
  },
  {
    id: 'm3',
    type: 'press',
    title: { en: 'Strategic Partnership with Oxford', ru: 'Партнерство с Оксфордом', uz: 'Oksford bilan hamkorlik' },
    url: 'https://picsum.photos/1200/800?random=52',
    thumbUrl: 'https://picsum.photos/800/600?random=52',
    tagIds: ['tag-innovation'],
    createdAt: '2024-05-17T15:00:00Z'
  },
  {
    id: 'm4',
    type: 'video',
    title: { en: 'Ambassador Interview: France', ru: 'Интервью с послом Франции', uz: 'Fransiya elchisi bilan suhbat' },
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbUrl: 'https://picsum.photos/800/600?random=53',
    tagIds: ['tag-diplomacy'],
    createdAt: '2024-05-18T15:00:00Z'
  }
];

export const MOCK_TAGS: Tag[] = [
  { id: 'tag-innovation', slug: 'innovation', label: 'Innovation' },
  { id: 'tag-diplomacy', slug: 'diplomacy', label: 'Diplomacy' },
  { id: 'tag-students', slug: 'students', label: 'Students' },
  { id: 'tag-event', slug: 'event', label: 'Event' }
];
