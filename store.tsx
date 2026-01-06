
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Theme, Language, AuthState, NewsArticle, Person, Category, MediaItem, Tag } from './types';
import { MOCK_ARTICLES, MOCK_PEOPLE, MOCK_CATEGORIES, MOCK_MEDIA, MOCK_TAGS } from './mockData';

interface State {
  theme: Theme;
  lang: Language;
  auth: AuthState;
  articles: NewsArticle[];
  people: Person[];
  categories: Category[];
  media: MediaItem[];
  tags: Tag[];
  bookmarks: string[]; // Article IDs
}

type Action =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_LANG'; payload: Language }
  | { type: 'LOGIN'; payload: any }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_BOOKMARK'; payload: string }
  | { type: 'ADD_ARTICLE'; payload: NewsArticle }
  | { type: 'UPDATE_ARTICLE'; payload: NewsArticle }
  | { type: 'DELETE_ARTICLE'; payload: string };

const initialState: State = {
  theme: (localStorage.getItem('uwed-theme') as Theme) || 'dark',
  lang: (localStorage.getItem('uwed-lang') as Language) || 'en',
  auth: {
    user: JSON.parse(localStorage.getItem('uwed-auth-user') || 'null'),
    isAuthenticated: !!localStorage.getItem('uwed-auth-user'),
  },
  articles: MOCK_ARTICLES,
  people: MOCK_PEOPLE,
  categories: MOCK_CATEGORIES,
  media: MOCK_MEDIA,
  tags: MOCK_TAGS,
  bookmarks: JSON.parse(localStorage.getItem('uwed-bookmarks') || '[]'),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('uwed-theme', action.payload);
      return { ...state, theme: action.payload };
    case 'SET_LANG':
      localStorage.setItem('uwed-lang', action.payload);
      return { ...state, lang: action.payload };
    case 'LOGIN':
      localStorage.setItem('uwed-auth-user', JSON.stringify(action.payload));
      return { ...state, auth: { user: action.payload, isAuthenticated: true } };
    case 'LOGOUT':
      localStorage.removeItem('uwed-auth-user');
      return { ...state, auth: { user: null, isAuthenticated: false } };
    case 'TOGGLE_BOOKMARK':
      const newBookmarks = state.bookmarks.includes(action.payload)
        ? state.bookmarks.filter(id => id !== action.payload)
        : [...state.bookmarks, action.payload];
      localStorage.setItem('uwed-bookmarks', JSON.stringify(newBookmarks));
      return { ...state, bookmarks: newBookmarks };
    case 'ADD_ARTICLE':
      return { ...state, articles: [action.payload, ...state.articles] };
    case 'UPDATE_ARTICLE':
      return { ...state, articles: state.articles.map(a => a.id === action.payload.id ? action.payload : a) };
    case 'DELETE_ARTICLE':
      return { ...state, articles: state.articles.filter(a => a.id !== action.payload) };
    default:
      return state;
  }
}

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [state.theme]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
