const React = require('react')
const Layout = require('../layouts/Layout')

function Show(props) {
  const { car } = props

  return (
    <Layout>
      <h1>{car.model} - {car.year}</h1>
      <div className="car-details">
        {car.images && car.images.length > 0 ? (
          <img src={car.images[0]} alt={car.model} style={{ maxWidth: '400px' }} />
        ) : (
          <p>No Image Available</p>
        )}
        <ul>
          <li><strong>Color:</strong> {car.color}</li>
          <li><strong>Price:</strong> {car.price} BHD</li>
          <li><strong>Location:</strong> {car.location}</li>
          <li><strong>Condition:</strong> {car.condition}</li>
          <li><strong>Views:</strong> {car.views}</li>
        </ul>

        <a href={`/cars/${car._id}/edit?token=${props.token}`} className="btn btn-secondary">Edit</a>
      </div>
    </Layout>
  )
}

module.exports = Show
