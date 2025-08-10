const React = require('react');
const Layout = require('../layouts/Layout');

function Show({ car }) {
  const hero = (car.images && car.images[0]) || '/img/placeholder-car.jpg';

  return (
    <Layout title={`${car.year} ${car.make} ${car.model}`}>
      <div className="page">
        <div className="hero" style={{ backgroundImage: `url(${hero})` }} />

        <div className="content two-cols">
          <div>
            <h1>{car.year} {car.make} {car.model}</h1>
            <p className="price big">${car.price?.toLocaleString?.()}</p>
            <p className="muted">{car.location || '—'} • {car.mileage ? `${car.mileage.toLocaleString()} km` : '—'}</p>

            {car.features?.length ? (
              <ul className="tags">
                {car.features.map((f, i) => <li key={i} className="tag">{f}</li>)}
              </ul>
            ) : null}

            <h3>Description</h3>
            <p>{car.description || 'No description.'}</p>
          </div>

          <aside className="panel">
            <h3>Seller</h3>
            <p><strong>{car.seller?.username}</strong></p>
            <p className="muted">{car.seller?.location || '—'}</p>
            <p className="muted">Phone: {car.seller?.phone || '—'}</p>

            <div className="actions">
              <a className="btn" href={`/cars/${car._id}/edit`}>Edit</a>
              <form method="POST" action={`/cars/${car._id}?_method=DELETE`} style={{ display: 'inline' }}>
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
        <p><strong>{com.author?.username || 'Anonymous'}</strong></p>
        <p>{com.body}</p>
        <p className="muted">{new Date(com.createdAt).toLocaleString()}</p>
      </div>
    ))
  ) : (
    <p className="muted">No comments yet.</p>
  )}

  <form method="POST" action="/comments">
    <input type="hidden" name="onModel" value="Car" />
    <input type="hidden" name="on" value={car._id} />
    <div className="form-group">
      <label>Add a comment</label>
      <textarea name="body" rows="3" required placeholder="Write your comment..."></textarea>
    </div>
    <button className="btn btn-primary" type="submit">Comment</button>
  </form>
</section>


      </div>
    </Layout>
  );
}

module.exports = Show;
