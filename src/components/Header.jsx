export default function Header({ favoriteCount, showingFavorites, onToggleFavorites }) {
  return (
    <header className="site-header">
      <div className="brand"><span className="brand-mark">C<span>●</span></span><span>campus<span className="brand-muted">reads</span></span></div>
      <nav aria-label="Main navigation">
        <span className="nav-label">Discover your next read</span>
        <button className={`favorites-nav ${showingFavorites ? 'selected' : ''}`} onClick={onToggleFavorites}>
          <span aria-hidden="true">♡</span> {showingFavorites ? 'All reads' : 'Saved reads'} <span className="count-pill">{favoriteCount}</span>
        </button>
      </nav>
    </header>
  );
}
