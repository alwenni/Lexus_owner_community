const React = require('react')
const Layout = require('../layouts/Layout')

function Index(props) {
  const { items } = props.user
  const token = props.token
  console.log(props)
  return (
    <Layout>
      <div className="marketplace-container ">
        <div className="header">
          <h1>Market-place</h1>
          {token && (
            <a href={`/items/new?token=${token}`} className="btn btn-primary">List Item</a>
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
            <select name="category" defaultValue={props.category || ''}>
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="btn btn-secondary">Filter</button>
          </form>
        </div>

        <div className="items-grid">
          {items.map(item => (
            <div key={item._id} className="item-card">
              <div className="item-image">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.title} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>
              <div className="item-info">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-price">${item.price}</p>
                <p className="item-location">{item.location}</p>
                <p className="item-condition">{item.condition}</p>
                <div className="item-footer">
                  <span className="views">Views: {item.views}</span>
                  <a href={`/items/${item._id}`} className="btn btn-secondary">View Details</a>
                </div>
              </div>
            </div>

            
          ))}
        </div>
      </div>
    </Layout>
  )
}

module.exports = Index