const React = require('react');
const Layout = require('../layouts/Layout');

function Show({ part }) {
  const hero = (part.images && part.images[0]) || '/img/placeholder-part.jpg';

  return (
    <Layout title={part.title}>
      <div className="page">
        <div className="hero" style={{ backgroundImage: `url(${hero})` }} />

        <div className="content two-cols">
          <div>
            <h1>{part.title}</h1>
            <p className="price big">${part.price?.toLocaleString?.()}</p>
            <p className="muted">{part.location || '—'} • {part.condition}</p>

            {Array.isArray(part.compatibleModels) && part.compatibleModels.length ? (
              <>
                <h3>Compatible Models</h3>
                <ul className="tags">
                  {part.compatibleModels.map((m, i) => <li key={i} className="tag">{m}</li>)}
                </ul>
              </>
            ) : null}

            <h3>Description</h3>
            <p>{part.description || 'No description.'}</p>
          </div>

          <aside className="panel">
            <h3>Seller</h3>
            <p><strong>{part.seller?.username}</strong></p>
            <p className="muted">{part.seller?.location || '—'}</p>
            <p className="muted">Phone: {part.seller?.phone || '—'}</p>

            <div className="actions">
              <a className="btn" href={`/parts/${part._id}/edit`}>Edit</a>
              <form method="POST" action={`/parts/${part._id}?_method=DELETE`} style={{ display: 'inline' }}>
                <button className="btn" type="submit">Delete</button>
              </form>
            </div>
          </aside>
        </div>

        <section className="comments">
  <h3>Comments</h3>

  {comments.length > 0 ? (
    comments.map((com) => (
      <div key={com._id} className="comment">
        <p>
          <strong>{com.author?.username || 'Anonymous'}</strong>
        </p>
        <p>{com.body}</p>
        <p className="muted">{new Date(com.createdAt).toLocaleString()}</p>
      </div>
    ))
  ) : (
    <p className="muted">No comments yet.</p>
  )}

  <form method="POST" action="/comments">
    <input type="hidden" name="onModel" value="Part" />
    <input type="hidden" name="on" value={part._id} />
    <div className="form-group">
      <label>Add a comment</label>
      <textarea
        name="body"
        rows="3"
        required
        placeholder="Write your comment..."
      ></textarea>
    </div>
    <button className="btn btn-primary" type="submit">
      Comment
    </button>
  </form>
</section>

      </div>
    </Layout>
  );
}
module.exports = Show;
