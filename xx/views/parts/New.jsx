const React = require('react');
const Layout = require('../layouts/Layout');

function New() {
  return (
    <Layout title="Sell a Part">
      <div className="page form-page">
        <h1 className="page-title">List a Spare Part</h1>

        <form method="POST" action="/parts">
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input name="title" placeholder="GS300 1999 A/C Compressor" required />
            </div>
            <div className="form-group">
              <label>Condition</label>
              <select name="condition" defaultValue="used">
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (USD)</label>
              <input name="price" type="number" min="0" required />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" placeholder="Manama" />
            </div>
          </div>

          <div className="form-group">
            <label>Images (comma-separated URLs)</label>
            <input name="images" placeholder="https://... , https://..." />
          </div>

          <div className="form-group">
            <label>Compatible Models (comma-separated)</label>
            <input name="compatibleModels" placeholder="GS300 1999, IS250 2010" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" placeholder="State condition, any defects, etc."></textarea>
          </div>

          <button className="btn btn-primary" type="submit">Publish</button>
          <a className="btn" href="/parts" style={{ marginLeft: 8 }}>Cancel</a>
        </form>
      </div>
    </Layout>
  );
}
module.exports = New;
