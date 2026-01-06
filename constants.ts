
import { NewsArticle, Expert, MultimediaItem } from './types';

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: "Campus Chronicle Unveils New Media Hub",
    category: "Innovation",
    author: "Sarah Thompson",
    date: "October 26, 2023",
    image: "https://picsum.photos/1200/600?random=1",
    excerpt: "The UWED Media hub features a sleek, user-friendly interface with intuitive navigation...",
  },
  {
    id: '2',
    title: "Student Government Elections Underway",
    category: "Campus Life",
    author: "James Wilson",
    date: "October 24, 2023",
    image: "https://picsum.photos/800/500?random=2",
    excerpt: "Candidates present platforms for campus improvements and student welfare initiatives.",
  },
  {
    id: '3',
    title: "New Study on Climate Change Published",
    category: "Research",
    author: "Dr. Elena Rossi",
    date: "October 22, 2023",
    image: "https://picsum.photos/800/500?random=3",
    excerpt: "Faculty research highlights critical impacts on local ecosystems and sustainable urban planning.",
  },
  {
    id: '4',
    title: "Campus Innovation Grant Awarded to AI Research Team",
    category: "Innovation",
    author: "Admin",
    date: "October 20, 2023",
    image: "https://picsum.photos/800/600?random=4",
    excerpt: "A major grant has been awarded to the interdisciplinary AI team for upcoming research projects."
  }
];

export const MOCK_EXPERTS: Expert[] = [
  {
    id: 'e1',
    name: "Dr. Amelia Harper",
    department: "Environmental Science",
    expertise: "Climate Change, Sustainability",
    image: "https://i.pravatar.cc/150?u=amelia"
  },
  {
    id: 'e2',
    name: "Professor Ethan Bennett",
    department: "History",
    expertise: "Ancient Civilizations, Archaeology",
    image: "https://i.pravatar.cc/150?u=ethan"
  },
  {
    id: 'e3',
    name: "Dr. Olivia Carter",
    department: "Psychology",
    expertise: "Cognitive Psychology, Behavioral Science",
    image: "https://i.pravatar.cc/150?u=olivia"
  },
  {
    id: 'e4',
    name: "Professor Noah Davis",
    department: "Engineering",
    expertise: "Mechanical Engineering, Robotics",
    image: "https://i.pravatar.cc/150?u=noah"
  }
];

export const MOCK_MULTIMEDIA: MultimediaItem[] = [
  {
    id: 'p1',
    type: 'podcast',
    title: "Campus Voices",
    description: "Interviews with students, faculty, and staff on vibrant campus life.",
    image: "https://picsum.photos/400/500?random=10"
  },
  {
    id: 'p2',
    type: 'podcast',
    title: "The Student Beat",
    description: "Student journalists discuss the latest news and events around campus.",
    image: "https://picsum.photos/400/500?random=11"
  },
  {
    id: 'p3',
    type: 'podcast',
    title: "Alumni Stories",
    description: "Hear from successful alumni about their career paths and experiences.",
    image: "https://picsum.photos/400/500?random=12"
  },
  {
    id: 'v1',
    type: 'video',
    title: "Campus Tour",
    description: "Take a virtual tour of our beautiful campus and modern facilities.",
    image: "https://picsum.photos/800/450?random=20"
  },
  {
    id: 'v2',
    type: 'video',
    title: "Research Spotlight",
    description: "Learn about groundbreaking research happening at our university.",
    image: "https://picsum.photos/800/450?random=21"
  }
];
