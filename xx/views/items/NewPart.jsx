const React = require('react')
const Layout = require('../layouts/Layout')

function New(props) {
  const token = props.token

  return (
    <Layout>
      <h1>Add a New Lexus Part</h1>
      <form action={`/parts?token=${token}`} method="POST" encType="multipart/form-data" className="form">
        <input type="text" name="model" placeholder="Model (e.g. LS 430)" required />
        <input type="number" name="year" placeholder="Year" required />
        <input type="number" name="price" placeholder="Price in BHD" required />
        <input type="text" name="location" placeholder="Location" required />
        <input type="text" name="condition" placeholder="Condition (e.g. Excellent)" required />
        <input type="file" name="images" multiple />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Layout>
  )
}

module.exports = New
