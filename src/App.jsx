import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ReadCard from './components/ReadCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import Footer from './components/Footer.jsx';

const API_URL = 'https://dummyjson.com/posts?limit=12';
const BACKUP_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadPosts() {
      try {
        let articles;
        try {
          const response = await fetch(API_URL, { signal: controller.signal });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          if (!Array.isArray(data.posts)) throw new Error('Invalid article data');
          articles = data.posts;
        } catch (primaryError) {
          if (controller.signal.aborted) return;
          const response = await fetch(BACKUP_URL, { signal: controller.signal });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const users = await response.json();
          articles = users.map((user) => ({
            id: user.id,
            title: `Meet ${user.name}`,
            body: `${user.name} works at ${user.company.name} in ${user.address.city}. ${user.company.catchPhrase}.`,
          }));
        }
        if (!controller.signal.aborted) {
          setPosts(articles);
          setError('');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Could not load articles:', err);
          setError('Could not load articles. Please refresh the page.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadPosts();
    return () => controller.abort();
  }, []);

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  const visiblePosts = useMemo(() => posts.filter((post) => {
    const matchesSearch = `${post.title} ${post.body}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesSearch && (!showingFavorites || favorites.includes(post.id));
  }), [posts, query, showingFavorites, favorites]);

  return (
    <div className="page-shell">
      <Header favoriteCount={favorites.length} showingFavorites={showingFavorites} onToggleFavorites={() => setShowingFavorites((value) => !value)} />
      <main>
        <section className="hero">
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> STORIES WORTH SHARING</div><h1>Good ideas start<br />with a <em>little curiosity.</em></h1><p>Fresh perspectives, thoughtful stories, and small sparks of inspiration for everyday student life.</p><a className="hero-link" href="#explore">Explore the collection <span aria-hidden="true">↗</span></a></div>
          <div className="hero-visual" aria-hidden="true"><div className="hero-sun"/><div className="hero-arch"><div className="hero-inner-arch"/></div><span className="hero-star">✳</span><span className="hero-visual-label">READ · THINK · GROW</span></div>
        </section>
        <section className="content-section" id="explore">
          <div className="section-header"><div><div className="section-kicker">THE COLLECTION</div><h2>{showingFavorites ? 'Your saved reads' : 'Explore the latest'}</h2><p>{showingFavorites ? 'All your favorite articles in one place.' : 'A little something for every curious mind.'}</p></div><span className="live-indicator"><span /> PUBLIC API CONTENT</span></div>
          <SearchBar query={query} onQueryChange={setQuery} resultCount={visiblePosts.length} />
          {loading && <div className="message" role="status">Loading articles from the public API...</div>}
          {error && <div className="message error" role="alert">{error}</div>}
          {!loading && !error && (visiblePosts.length ? <div className="card-grid">{visiblePosts.map((post) => <ReadCard key={post.id} post={post} isFavorite={favorites.includes(post.id)} onToggleFavorite={toggleFavorite} />)}</div> : <div className="message">No articles found. Try a different search or save an article first.</div>)}
        </section>
      </main>
      <Footer />
    </div>
  );
}
