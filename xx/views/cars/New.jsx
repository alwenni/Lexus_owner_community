const React = require('react');
const Layout = require('../layouts/Layout');

function New() {
  return (
    <Layout title="Sell a Car">
      <div className="page form-page">
        <h1 className="page-title">Sell Your Lexus</h1>

        <form method="POST" action="/cars">
          <div className="form-row">
            <div className="form-group">
              <label>Make</label>
              <input name="make" defaultValue="Lexus" required />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input name="model" placeholder="GS 300" required />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input name="year" type="number" min="1989" max="2026" required />
            </div>
            <div className="form-group">
              <label>Price (USD)</label>
              <input name="price" type="number" min="0" required />
            </div>
            <div className="form-group">
              <label>Mileage (km)</label>
              <input name="mileage" type="number" min="0" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" placeholder="Manama" />
            </div>
          </div>

          <div className="form-group">
            <label>Images (paste URLs, comma-separated)</label>
            <input name="images" placeholder="https://... , https://..." />
          </div>

          <div className="form-group">
            <label>Features (comma-separated)</label>
            <input name="features" placeholder="Sunroof, Leather seats" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" placeholder="Describe condition, service history, etc."></textarea>
          </div>

          <button className="btn btn-primary" type="submit">Publish</button>
          <a className="btn" href="/cars" style={{ marginLeft: 8 }}>Cancel</a>
        </form>
      </div>
    </Layout>
  );
}

module.exports = New;
