const React = require('react');
const Layout = require('../layouts/Layout');

function Edit({ part }) {
  return (
    <Layout title={`Edit ${part.title}`}>
      <div className="page form-page">
        <h1 className="page-title">Edit Part</h1>

        <form method="POST" action={`/parts/${part._id}?_method=PUT`}>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input name="title" defaultValue={part.title} required />
            </div>
            <div className="form-group">
              <label>Condition</label>
              <select name="condition" defaultValue={part.condition}>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (USD)</label>
              <input name="price" type="number" defaultValue={part.price} required />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" defaultValue={part.location} />
            </div>
          </div>

          <div className="form-group">
            <label>Images (comma-separated URLs)</label>
            <input name="images" defaultValue={(part.images || []).join(', ')} />
          </div>

          <div className="form-group">
            <label>Compatible Models (comma-separated)</label>
            <input name="compatibleModels" defaultValue={(part.compatibleModels || []).join(', ')} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" defaultValue={part.description}></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" defaultValue={part.status}>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">Save</button>
          <a className="btn" href={`/parts/${part._id}`} style={{ marginLeft: 8 }}>Cancel</a>
        </form>
      </div>
    </Layout>
  );
}
module.exports = Edit;
