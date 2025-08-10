const React = require('react');
const Layout = require('../layouts/Layout');

function Index({ parts = [] }) {
  return (
    <Layout title="Parts">
      <div className="page">
        <h1 className="page-title">Lexus Spare Parts</h1>

        <form className="filters" method="GET" action="/parts">
          <input name="title" placeholder="Search title (e.g., Compressor)" />
          <select name="condition" defaultValue="">
            <option value="">Any condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
          <input name="minPrice" type="number" placeholder="Min Price" />
          <input name="maxPrice" type="number" placeholder="Max Price" />
          <input name="location" placeholder="Location" />
          <button className="btn btn-primary">Filter</button>
          <a className="btn" href="/parts">Reset</a>
          <a className="btn btn-primary" href="/parts/new" style={{ marginLeft: 'auto' }}>+ Sell a Part</a>
        </form>

        <div className="grid">
          {parts.map((p) => (
            <a key={p._id} className="card" href={`/parts/${p._id}`}>
              <div className="thumb" style={{ backgroundImage: `url(${(p.images && p.images[0]) || '/img/placeholder-part.jpg'})` }} />
              <div className="card-body">
                <h3>{p.title}</h3>
                <p className="price">${p.price?.toLocaleString?.() || '-'}</p>
                <p className="muted">{p.location || '—'} • {p.condition}</p>
                <p className="muted">Seller: {p.seller?.username || '—'}</p>
              </div>
            </a>
          ))}
          {parts.length === 0 && <div className="empty">No parts found.</div>}
        </div>
      </div>
    </Layout>
  );
}
module.exports = Index;
