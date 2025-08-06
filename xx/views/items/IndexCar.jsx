const React = require('react')
const Layout = require('../layouts/Layout')

function IndexCar(props) {
  const { cars } = props.user
  const token = props.token
  console.log(props)
  return (
    <Layout>
      <div className="marketplace-container ">
        <div className="header">
          <h1>Cars</h1>
          {token && (
            <a href={`/car/new?token=${token}`} className="btn btn-primary">List Item</a>
          )}
        </div>

        <div className="search-filter">
          <form method="GET" className="search-form">
            <input
              type="text"
              name="search"
              placeholder="Search items..."
              defaultValue={props.search || ''}
            />
            <select name="year" defaultValue={props.year || ''}>
              <option value="">All Years</option>
              <option value="2023">2023</option>
              <option value="2020">2020</option>
              <option value="2015">2015</option>
              <option value="2010">2010</option>
              <option value="2005">2005</option>
              <option value="2003">2003</option>
            </select>
            <button type="submit" className="btn btn-secondary">Filter</button>
          </form>
        </div>

        <div className="items-grid">
          {cars.map(car => (
            <div key={car._id} className="item-card">
              <div className="item-image">
                {car.images && car.images.length > 0 ? (
                  <img src={car.images[0]} alt={car.title} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>
              <div className="item-info">
                <h3 className="item-title">{car.model} - {car.year}</h3>
                <p className="item-price">{car.price} BHD</p>
                <p className="item-color">Color: {car.color}</p>
                <p className="item-location">{car.location}</p>
                <p className="item-condition">Condition: {car.condition}</p>
                <div className="item-footer">
                  <span className="views">Views: {car.views}</span>
                  <a href={`/cars/${car._id}`} className="btn btn-secondary">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

module.exports = IndexCar