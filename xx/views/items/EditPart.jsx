const React = require('react')
const Layout = require('../layouts/Layout')

function Edit(props) {
  const { part } = props
  const token = props.token

  return (
    <Layout>
      <h1>Edit Part</h1>
      <form action={`/parts/${part._id}?_method=PUT&token=${token}`} method="POST" className="form">
        <input type="text" name="name" defaultValue={part.name} required />
        <input type="number" name="year" defaultValue={part.year} required />
        <input type="number" name="price" defaultValue={part.price} required />
        <input type="text" name="location" defaultValue={part.location} required />
        <input type="text" name="condition" defaultValue={part.condition} required />
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </Layout>
  )
}

module.exports = Edit
