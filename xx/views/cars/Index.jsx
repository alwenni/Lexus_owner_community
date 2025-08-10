const React = require('react');
const Layout = require('../layouts/Layout');

function Index({ cars = [] }) {
  return (
    <Layout title="Cars">
      <div className="page">
        <h1 className="page-title">Lexus Cars Marketplace</h1>

        <form className="filters" method="GET" action="/cars">
          <input name="make" placeholder="Make (Lexus)" defaultValue="Lexus" />
          <input name="model" placeholder="Model (GS 300)" />
          <input name="minYear" type="number" placeholder="Min Year" />
          <input name="maxYear" type="number" placeholder="Max Year" />
          <input name="minPrice" type="number" placeholder="Min Price" />
          <input name="maxPrice" type="number" placeholder="Max Price" />
          <input name="location" placeholder="Location" />
          <button className="btn btn-primary">Filter</button>
          <a className="btn" href="/cars">Reset</a>
          <a className="btn btn-primary" href="/cars/new" style={{ marginLeft: 'auto' }}>+ Sell a Car</a>
        </form>

        <div className="grid">
          {cars.map((c) => (
            <a key={c._id} className="card" href={`/cars/${c._id}`}>
              <div className="thumb" style={{ backgroundImage: `url(${(c.images && c.images[0]) || '/img/placeholder-car.jpg'})` }} />
              <div className="card-body">
                <h3>{c.year} {c.make} {c.model}</h3>
                <p className="price">${c.price?.toLocaleString?.() || '-'}</p>
                <p className="muted">{c.location || '—'}</p>
                <p className="muted">Seller: {c.seller?.username || '—'}</p>
              </div>
            </a>
          ))}
          {cars.length === 0 && <div className="empty">No cars found.</div>}
        </div>
      </div>
    </Layout>
  );
}

module.exports = Index;
