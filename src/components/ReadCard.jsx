const tags = ['STUDENT LIFE', 'CREATIVE THINKING', 'PRODUCTIVITY', 'PERSPECTIVES'];
const colors = ['peach', 'blue', 'lavender', 'green'];

export default function ReadCard({ post, isFavorite, onToggleFavorite }) {
  const index = (post.id - 1) % tags.length;
  return (
    <article className="read-card">
      <div className={`card-art ${colors[index]}`} aria-hidden="true">
        <span className="art-circle art-one" /><span className="art-circle art-two" />
        <span className="art-number">{String(post.id).padStart(2, '0')}</span>
      </div>
      <div className="card-content">
        <div className="card-meta"><span>{tags[index]}</span><span>3 min read</span></div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div className="card-bottom">
          <span className="author"><span className="author-avatar">CR</span> Campus Community</span>
          <button className={`save-button ${isFavorite ? 'saved' : ''}`} onClick={() => onToggleFavorite(post.id)} aria-label={isFavorite ? `Unsave ${post.title}` : `Save ${post.title}`} aria-pressed={isFavorite}>
            {isFavorite ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    </article>
  );
}
