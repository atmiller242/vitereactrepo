export default function SearchBar({ query, onQueryChange, resultCount }) {
  return (
    <div className="search-row">
      <label className="search-field">
        <span aria-hidden="true" className="search-icon">⌕</span>
        <span className="visually-hidden">Search articles</span>
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search articles by title or topic..." />
      </label>
      <span className="result-count">{resultCount} {resultCount === 1 ? 'article' : 'articles'}</span>
    </div>
  );
}
