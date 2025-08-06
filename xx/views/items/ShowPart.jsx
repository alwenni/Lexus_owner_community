const React = require('react')
const Layout = require('../layouts/Layout')

function Show(props) {
  const { part } = props

  return (
    <Layout>
      <h1>{part.model} - {part.year}</h1>
      <div className="part-details">
        {part.images && part.images.length > 0 ? (
          <img src={part.images[0]} alt={part.model} style={{ maxWidth: '400px' }} />
        ) : (
          <p>No Image Available</p>
        )}
        <ul>
          <li><strong>Color:</strong> {part.color}</li>
          <li><strong>Price:</strong> {part.price} BHD</li>
          <li><strong>Location:</strong> {part.location}</li>
          <li><strong>Condition:</strong> {part.condition}</li>
          <li><strong>Views:</strong> {part.views}</li>
        </ul>

        <a href={`/parts/${part._id}/edit?token=${props.token}`} className="btn btn-secondary">Edit</a>
      </div>
    </Layout>
  )
}

module.exports = Show
