const React = require('react');
const Layout = require('../layouts/Layout');

function Edit({ car }) {
  return (
    <Layout title={`Edit ${car.year} ${car.make} ${car.model}`}>
      <div className="page form-page">
        <h1 className="page-title">Edit Car</h1>

        <form method="POST" action={`/cars/${car._id}?_method=PUT`}>
          <div className="form-row">
            <div className="form-group">
              <label>Make</label>
              <input name="make" defaultValue={car.make} required />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input name="model" defaultValue={car.model} required />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input name="year" type="number" defaultValue={car.year} required />
            </div>
            <div className="form-group">
              <label>Price (USD)</label>
              <input name="price" type="number" defaultValue={car.price} required />
            </div>
            <div className="form-group">
              <label>Mileage (km)</label>
              <input name="mileage" type="number" defaultValue={car.mileage} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" defaultValue={car.location} />
            </div>
          </div>

          <div className="form-group">
            <label>Images (comma-separated URLs)</label>
            <input name="images" defaultValue={(car.images || []).join(', ')} />
          </div>

          <div className="form-group">
            <label>Features (comma-separated)</label>
            <input name="features" defaultValue={(car.features || []).join(', ')} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" defaultValue={car.description}></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" defaultValue={car.status}>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">Save</button>
          <a className="btn" href={`/cars/${car._id}`} style={{ marginLeft: 8 }}>Cancel</a>
        </form>
      </div>
    </Layout>
  );
}

module.exports = Edit;
