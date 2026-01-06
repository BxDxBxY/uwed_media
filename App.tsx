import React, { useState, useEffect, useMemo, useRef } from "react";
import { StoreProvider, useStore } from "./store";
import { translations } from "./translations";
import {
  Language,
  NewsArticle,
  Person,
  Category,
  Subcategory,
  MediaItem,
} from "./types";

// --- UTILS ---
const getLoc = (obj: any, lang: Language) => {
  if (typeof obj === "string") return obj;
  return obj?.[lang] || obj?.en || "";
};

// --- REUSABLE COMPONENTS ---
const Breadcrumbs: React.FC<{
  paths: { label: string; active?: boolean; onClick: () => void }[];
}> = ({ paths }) => (
  <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6 px-4 md:px-0">
    {paths.map((p, idx) => (
      <React.Fragment key={idx}>
        <button
          onClick={p.onClick}
          className={`${
            p.active
              ? "text-blue-600 font-bold"
              : "hover:text-slate-700 dark:hover:text-slate-200"
          } transition-colors`}
        >
          {p.label}
        </button>
        {idx < paths.length - 1 && <span>/</span>}
      </React.Fragment>
    ))}
  </nav>
);

const SectionHeading: React.FC<{
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}> = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div className="max-w-xl">
      <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-slate-900 dark:text-white mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          {subtitle}
        </p>
      )}
    </div>
    {action && (
      <button
        onClick={action.onClick}
        className="text-blue-600 font-black text-sm uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center gap-2 group"
      >
        {action.label}{" "}
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </button>
    )}
  </div>
);

const ArticleCard: React.FC<{
  article: NewsArticle;
  variant?: "standard" | "minimal" | "landscape";
  onClick: () => void;
  lang: Language;
}> = ({ article, variant = "standard", onClick, lang }) => {
  if (variant === "minimal") {
    return (
      <div
        className="group cursor-pointer flex gap-4 items-start"
        onClick={onClick}
      >
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
          <img
            src={article.coverUrl}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            alt=""
          />
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {getLoc(article.title, lang)}
          </h4>
          <span className="text-[10px] text-slate-400 uppercase font-black mt-2 block">
            {new Date(article.publishedAt || "").toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  }

  if (variant === "landscape") {
    return (
      <div
        className="group cursor-pointer grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
        onClick={onClick}
      >
        <div className="md:col-span-2 aspect-video rounded-3xl overflow-hidden shadow-xl">
          <img
            src={article.coverUrl}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt=""
          />
        </div>
        <div className="md:col-span-3">
          <span className="text-xs font-black text-blue-600 uppercase mb-3 block">
            Featured Analysis
          </span>
          <h3 className="text-2xl font-serif font-bold mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {getLoc(article.title, lang)}
          </h3>
          <p className="text-slate-500 line-clamp-3 text-sm mb-6">
            {getLoc(article.summary, lang)}
          </p>
          <button className="text-sm font-bold border-b-2 border-slate-900 pb-1">
            Read Investigation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={article.coverUrl}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt=""
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-900 shadow-lg">
            {article.categoryId?.split("-")[1].toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {getLoc(article.title, lang)}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">
          {getLoc(article.summary, lang)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold">
              U
            </div>
            <span className="text-xs font-bold text-slate-400">
              {article.author}
            </span>
          </div>
          <span className="text-[10px] font-black text-slate-300 uppercase">
            {new Date(article.publishedAt || "").toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- PAGES ---

const HomePage: React.FC<{
  navigate: any;
  lang: Language;
  t: any;
  articles: NewsArticle[];
  people: Person[];
  categories: Category[];
}> = ({ navigate, lang, t, articles, people, categories }) => {
  const latest = articles.slice(0, 6);
  const trending = [...articles]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 4);
  const professors = people.filter((p) => p.type === "professor");

  return (
    <div className="space-y-24 animate-in">
      {/* Ticker */}
      <div className="bg-blue-600 text-white py-3 overflow-hidden rounded-2xl flex items-center">
        <div className="px-6 font-black text-xs border-r border-blue-400 whitespace-nowrap">
          FLASH NEWS
        </div>
        <div className="flex gap-12 animate-[ticker_30s_linear_infinite] whitespace-nowrap text-xs font-bold uppercase tracking-widest px-6">
          {latest.map((a) => (
            <span
              key={a.id}
              className="cursor-pointer hover:underline"
              onClick={() => navigate("article", a)}
            >
              {getLoc(a.title, lang)} •{" "}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div
            className="relative aspect-[21/9] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl"
            onClick={() => navigate("article", latest[0])}
          >
            <img
              src={latest[0].coverUrl}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <span className="inline-block px-4 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full mb-4 uppercase tracking-widest">
                Headline Story
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">
                {getLoc(latest[0].title, lang)}
              </h1>
              <p className="text-slate-200 text-sm max-w-2xl line-clamp-2">
                {getLoc(latest[0].summary, lang)}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>{" "}
            Most Read Now
          </h3>
          <div className="space-y-6">
            {trending.map((a, i) => (
              <div
                key={a.id}
                className="flex gap-4 group cursor-pointer"
                onClick={() => navigate("article", a)}
              >
                <span className="text-4xl font-serif font-black text-slate-100 dark:text-slate-800">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="font-bold text-sm leading-snug group-hover:text-blue-600 transition-colors">
                    {getLoc(a.title, lang)}
                  </h4>
                  <span className="text-[10px] text-slate-400 uppercase mt-1 block">
                    {a.viewCount} reads
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Section (Grid shelf) */}
      <section>
        <SectionHeading
          title="University Life"
          subtitle="Student voices, research hubs, and daily campus chronicles"
          action={{
            label: "Go to University News",
            onClick: () => navigate("news_list", { categoryId: "cat-univ" }),
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles
            .filter((a) => a.categoryId === "cat-univ")
            .slice(0, 3)
            .map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                lang={lang}
                onClick={() => navigate("article", a)}
              />
            ))}
        </div>
      </section>

      {/* Faculty Carousel */}
      <section className="bg-slate-900 -mx-4 lg:-mx-8 px-8 py-24 text-white rounded-[4rem] shadow-inner overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            title="Meet our Experts"
            subtitle="World-class professors leading global diplomacy research"
          />
          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide pt-4">
            {professors.map((p) => (
              <div
                key={p.id}
                className="min-w-[300px] bg-white/5 border border-white/10 p-8 rounded-[3rem] text-center hover:bg-white/10 transition-all group cursor-pointer"
                onClick={() => navigate("profile", p)}
              >
                <img
                  src={p.photoUrl}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500 group-hover:scale-110 transition-transform shadow-2xl"
                  alt=""
                />
                <h4 className="text-xl font-bold">{p.name}</h4>
                <p className="text-blue-400 text-sm font-black mb-4 uppercase tracking-tighter">
                  {p.title}
                </p>
                <button className="text-[10px] font-black uppercase bg-white text-slate-900 px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                  Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Politics Landscape Shelf */}
      <section>
        <SectionHeading
          title="Global Politics"
          subtitle="Deep dives into international relations and strategic policy"
          action={{
            label: "World Desk",
            onClick: () => navigate("news_list", { categoryId: "cat-pol" }),
          }}
        />
        <div className="space-y-12">
          {articles
            .filter((a) => a.categoryId === "cat-pol")
            .slice(0, 2)
            .map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                variant="landscape"
                lang={lang}
                onClick={() => navigate("article", a)}
              />
            ))}
        </div>
      </section>
      {/* Upcoming Events */}
      <section className="bg-blue-50 dark:bg-slate-900/50 p-12 lg:p-20 rounded-[4rem] border border-blue-100 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Events Calendar
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Join our symposia, workshops, and networking events. Build your
              future today.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg">
              View Full Calendar
            </button>
          </div>
          <div className="lg:w-2/3 space-y-6">
            {[
              {
                date: "15 JUN",
                title: "Intl. Law Symposium 2024",
                location: "Hall A",
              },
              {
                date: "22 JUN",
                title: "Student Debate Finals",
                location: "Digital Hub",
              },
              {
                date: "04 JUL",
                title: "Alumni Gala Dinner",
                location: "Grand Ballroom",
              },
            ].map((e, idx) => (
              <div
                key={idx}
                className="flex items-center gap-8 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-blue-100"
              >
                <div className="text-center w-20 flex-shrink-0">
                  <span className="block text-2xl font-black text-blue-600 leading-none">
                    {e.date.split(" ")[0]}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest">
                    {e.date.split(" ")[1]}
                  </span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold mb-1">{e.title}</h4>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    📍 {e.location}
                  </span>
                </div>
                <button className="text-blue-600 text-2xl">⊕</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final Long Shelf - More News */}
      <section>
        <SectionHeading title="Recent Dispatches" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.slice(0, 8).map((a) => (
            <ArticleCard
              key={a.id}
              article={a}
              variant="minimal"
              lang={lang}
              onClick={() => navigate("article", a)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const MediaPage: React.FC<{ lang: Language; t: any; media: MediaItem[] }> = ({
  lang,
  t,
  media,
}) => {
  const [activeTab, setActiveTab] = useState<
    "all" | "video" | "photo" | "press"
  >("all");
  const filteredMedia =
    activeTab === "all" ? media : media.filter((m) => m.type === activeTab);

  return (
    <div className="space-y-16 animate-in">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-xs font-black text-blue-600 uppercase tracking-[0.3em]">
          The Visual Archive
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter">
          Media Portal
        </h1>
        <p className="text-lg text-slate-500">
          Capture the pulse of the university through our high-definition
          galleries, video essays, and documentary captures.
        </p>
      </div>

      {/* Interactive Filter */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded-3xl flex items-center gap-2 shadow-inner border border-slate-200 dark:border-slate-800">
          {(["all", "video", "photo", "press"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${
                activeTab === tab
                  ? "bg-white dark:bg-blue-600 shadow-xl text-blue-600 dark:text-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Video slot */}
      {activeTab !== "photo" && activeTab !== "press" && (
        <section className="bg-slate-900 rounded-[3rem] overflow-hidden relative aspect-video shadow-2xl group border-4 border-white dark:border-slate-800">
          <iframe
            src={media[0].url}
            className="w-full h-full border-none opacity-80"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute top-10 left-10 pointer-events-none">
            <span className="px-4 py-1 bg-red-600 text-white text-[10px] font-black rounded-full uppercase mb-4 block">
              Recommended Video
            </span>
            <h2 className="text-4xl font-serif font-bold text-white mb-2">
              {getLoc(media[0].title, lang)}
            </h2>
            <p className="text-slate-400 text-sm">
              Published May 2024 • 12.5k views
            </p>
          </div>
        </section>
      )}

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMedia.map((m) => (
          <div
            key={m.id}
            className="group relative aspect-square rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer bg-slate-200"
          >
            <img
              src={m.thumbUrl}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
              <span className="text-[10px] font-black text-blue-400 uppercase mb-2">
                {m.type}
              </span>
              <h4 className="text-white font-bold text-lg mb-4">
                {getLoc(m.title, lang)}
              </h4>
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 text-xl font-bold">
                {m.type === "video" ? "▶" : "👁"}
              </button>
            </div>
            {m.type === "video" && (
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <span className="text-white text-xs">▶</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="py-40 text-center text-slate-400">
          <span className="text-6xl mb-6 block opacity-20">🎞️</span>
          <p className="font-bold text-xl uppercase tracking-widest">
            Archive Empty for this category
          </p>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP CONTENT ---

const AppContent: React.FC = () => {
  const { state, dispatch } = useStore();
  const [view, setView] = useState<{ type: string; params?: any }>({
    type: "home",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const t = translations[state.lang];

  const navigate = (type: string, params?: any) => {
    setView({ type, params });
    setSearchQuery("");
    window.scrollTo(0, 0);
  };

  const NewsListingPage = ({
    categoryId,
    subcategoryId,
  }: {
    categoryId: string;
    subcategoryId?: string;
  }) => {
    const category = state.categories.find((c) => c.id === categoryId);
    const articles = state.articles.filter(
      (a) =>
        a.categoryId === categoryId &&
        (!subcategoryId || a.subcategoryId === subcategoryId)
    );

    return (
      <div className="animate-in">
        <Breadcrumbs
          paths={[
            { label: t.home, onClick: () => navigate("home") },
            {
              label: getLoc(category?.name, state.lang),
              active: !subcategoryId,
              onClick: () => navigate("news_list", { categoryId }),
            },
          ]}
        />
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-black mb-8">
            {getLoc(category?.name, state.lang)} Dispatches
          </h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("news_list", { categoryId })}
              className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
                !subcategoryId
                  ? "bg-blue-600 text-white shadow-xl"
                  : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200"
              }`}
            >
              ALL {getLoc(category?.name, state.lang).toUpperCase()}
            </button>
            {category?.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() =>
                  navigate("news_list", { categoryId, subcategoryId: sub.id })
                }
                className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
                  subcategoryId === sub.id
                    ? "bg-blue-600 text-white shadow-xl"
                    : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200"
                }`}
              >
                {getLoc(sub.name, state.lang).toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => (
            <ArticleCard
              key={a.id}
              article={a}
              lang={state.lang}
              onClick={() => navigate("article", a)}
            />
          ))}
        </div>
      </div>
    );
  };
  const SectionTitle: React.FC<{
    title: string;
    subtitle?: string;
    action?: { label: string; onClick: () => void };
  }> = ({ title, subtitle, action }) => (
    <div className="mb-10 flex items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mb-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1"
        >
          {action.label} <span>→</span>
        </button>
      )}
    </div>
  );
  {
    /* Upcoming Events */
  }
  <section className="bg-blue-50 dark:bg-slate-900/50 p-12 lg:p-20 rounded-[4rem] border border-blue-100 dark:border-slate-800">
    <div className="flex flex-col lg:flex-row gap-16">
      <div className="lg:w-1/3">
        <h2 className="text-4xl font-serif font-bold mb-6">Events Calendar</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Join our symposia, workshops, and networking events. Build your future
          today.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg">
          View Full Calendar
        </button>
      </div>
      <div className="lg:w-2/3 space-y-6">
        {[
          {
            date: "15 JUN",
            title: "Intl. Law Symposium 2024",
            location: "Hall A",
          },
          {
            date: "22 JUN",
            title: "Student Debate Finals",
            location: "Digital Hub",
          },
          {
            date: "04 JUL",
            title: "Alumni Gala Dinner",
            location: "Grand Ballroom",
          },
        ].map((e, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-blue-100"
          >
            <div className="text-center w-20 flex-shrink-0">
              <span className="block text-2xl font-black text-blue-600 leading-none">
                {e.date.split(" ")[0]}
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest">
                {e.date.split(" ")[1]}
              </span>
            </div>
            <div className="flex-grow">
              <h4 className="text-xl font-bold mb-1">{e.title}</h4>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                📍 {e.location}
              </span>
            </div>
            <button className="text-blue-600 text-2xl">⊕</button>
          </div>
        ))}
      </div>
    </div>
  </section>;
  const ContactPage = () => {
    const [sent, setSent] = useState(false);
    return (
      <div className="animate-in fade-in duration-500 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionTitle
            title={t.contact}
            subtitle="We'd love to hear from you"
          />
          <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            Have a story lead? Need to reach a professor? Or just want to say
            hi? Use the form below and our media team will get back to you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center font-bold">
                ⌂
              </div>
              <div>
                <h4 className="font-bold">Address</h4>
                <p className="text-sm text-slate-500">
                  54 Mustaqillik Avenue, Tashkent, Uzbekistan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center font-bold">
                ☏
              </div>
              <div>
                <h4 className="font-bold">Phone</h4>
                <p className="text-sm text-slate-500">+998 71 239 41 40</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
          {sent ? (
            <div className="text-center py-20 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                ✓
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.contactSuccess}</h3>
              <button
                onClick={() => setSent(false)}
                className="text-blue-600 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  {t.subject}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  {t.message}
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
              >
                {t.sendMessage}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };
  const renderView = () => {
    if (searchQuery)
      return (
        <div className="p-20 text-center font-bold text-3xl opacity-50">
          Search results for: {searchQuery}
        </div>
      );
    switch (view.type) {
      case "home":
        return (
          <HomePage
            navigate={navigate}
            lang={state.lang}
            t={t}
            articles={state.articles}
            people={state.people}
            categories={state.categories}
          />
        );
      case "article":
        return (
          <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl">
            <button
              onClick={() => navigate("home")}
              className="mb-6 font-bold text-blue-600"
            >
              ← Back
            </button>
            <h1 className="text-4xl font-serif font-bold mb-6">
              {getLoc(view.params.title, state.lang)}
            </h1>
            <img
              src={view.params.coverUrl}
              className="w-full rounded-3xl mb-10 shadow-2xl"
              alt=""
            />
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: getLoc(view.params.content, state.lang),
              }}
            />
          </div>
        );
      case "media":
        return <MediaPage lang={state.lang} t={t} media={state.media} />;
      case "news_list":
        return (
          <NewsListingPage
            categoryId={view.params.categoryId}
            subcategoryId={view.params.subcategoryId}
          />
        );
      case "people":
        return (
          <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl">
            People Directory View
          </div>
        );
      case "profile":
        return (
          <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl">
            Expert Profile: {view.params.name}
          </div>
        );
      case "contact":
        return (
          <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl">
            <ContactPage />
          </div>
        );
      default:
        return (
          <HomePage
            navigate={navigate}
            lang={state.lang}
            t={t}
            articles={state.articles}
            people={state.people}
            categories={state.categories}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("home")}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter hidden sm:inline-block uppercase">
              UWED<span className="text-blue-600 font-serif ml-1">Media</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => navigate("home")}
              className="font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
            >
              {t.home}
            </button>
            <div className="relative group">
              <button className="font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-1">
                {t.news} <span>▾</span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform translate-y-2 group-hover:translate-y-0 py-4 overflow-hidden">
                {state.categories.map((c) => (
                  <div key={c.id} className="relative group/sub">
                    <button
                      className="w-full text-left px-6 py-3 hover:bg-blue-50 dark:hover:bg-slate-800 text-xs font-black flex justify-between items-center transition-colors"
                      onClick={() =>
                        navigate("news_list", { categoryId: c.id })
                      }
                    >
                      {getLoc(c.name, state.lang).toUpperCase()}{" "}
                      {c.subcategories.length > 0 && <span>›</span>}
                    </button>
                    {c.subcategories.length > 0 && (
                      <div className="absolute left-full top-0 ml-1 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 opacity-0 group-hover/sub:opacity-100 pointer-events-none group-hover/sub:pointer-events-auto py-4">
                        {c.subcategories.map((sub) => (
                          <button
                            key={sub.id}
                            className="w-full text-left px-6 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-bold uppercase"
                            onClick={() =>
                              navigate("news_list", {
                                categoryId: c.id,
                                subcategoryId: sub.id,
                              })
                            }
                          >
                            {getLoc(sub.name, state.lang)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate("media")}
              className="font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
            >
              {t.multimedia}
            </button>
            <button
              onClick={() => navigate("contact")}
              className="font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
            >
              {t.contact}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="bg-slate-100 dark:bg-slate-800 border-none rounded-full px-6 py-2 text-xs font-bold focus:ring-2 focus:ring-blue-500 w-40 transition-all focus:w-60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
              {(["en", "ru", "uz"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => dispatch({ type: "SET_LANG", payload: l })}
                  className={`w-8 h-8 rounded-full text-[10px] font-black transition-all ${
                    state.lang === l
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                dispatch({
                  type: "SET_THEME",
                  payload: state.theme === "dark" ? "light" : "dark",
                })
              }
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {state.theme === "dark" ? "☼" : "☾"}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4 lg:px-8 max-w-7xl mx-auto">
        {renderView()}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">U</span>
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase">
              UWED<span className="text-blue-600 font-serif ml-1">Media</span>
            </span>
          </div>
          <p className="text-xl font-serif text-slate-500 italic">
            "Empowering the diplomatic leaders of tomorrow through rigorous
            intellectual discourse and global connection."
          </p>
          <div className="flex justify-center gap-12 font-black text-xs uppercase tracking-widest text-slate-400">
            <span className="cursor-pointer hover:text-blue-600 transition-colors">
              Facebook
            </span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors">
              Instagram
            </span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors">
              LinkedIn
            </span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors">
              YouTube
            </span>
          </div>
          <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
              © 2024 University of World Economy and Diplomacy • Media Portal
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => (
  <StoreProvider>
    <AppContent />
  </StoreProvider>
);

export default App;
