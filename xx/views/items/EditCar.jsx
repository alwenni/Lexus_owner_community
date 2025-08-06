const React = require('react')
const Layout = require('../layouts/Layout')

function Edit(props) {
  const { car } = props
  const token = props.token

  return (
    <Layout>
      <h1>Edit Car</h1>
      <form action={`/cars/${car._id}?_method=PUT&token=${token}`} method="POST" className="form">
        <input type="text" name="model" defaultValue={car.model} required />
        <input type="number" name="year" defaultValue={car.year} required />
        <input type="text" name="color" defaultValue={car.color} required />
        <input type="number" name="price" defaultValue={car.price} required />
        <input type="text" name="location" defaultValue={car.location} required />
        <input type="text" name="condition" defaultValue={car.condition} required />
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </Layout>
  )
}

module.exports = Edit
