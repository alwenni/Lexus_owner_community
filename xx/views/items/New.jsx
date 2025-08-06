const React = require('react')
const Layout = require('../layouts/Layout')

function New(props) {
  const token = props.token

  return (
    <Layout>
      <div className="form-container">
        <h1>List Your Item</h1>
        <form action={`/items?token=${token}`} method="POST">
          <div className="form-group">
            <label htmlFor="title">Item Title:</label>
            <input type="text" id="title" name="title" required maxLength="100" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" required maxLength="1000" rows="6"></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($):</label>
              <input type="number" id="price" name="price" required min="0" step="0.01" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select id="category" name="category" required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="condition">Condition:</label>
              <select id="condition" name="condition" required>
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" name="location" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="images">Image URLs (one per line):</label>
            <textarea id="images" name="images" rows="3" placeholder="https://example.com/image1.jpg"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">List Item</button>
          <a href={`/items?token=${token}`} className="btn btn-secondary">Cancel</a>
        </form>
      </div>
    </Layout>
  )
}

module.exports = New