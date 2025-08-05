const React = require('react')
const Layout = require('../layouts/Layout')

function New (props) {
    return(
        <Layout>
            <h1> Add New Item</h1>

            <form action={`/posts?token=${props.token}`} method="POST">
                <div className="form-group">
                    <label htmlFor="name">Item Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name" 
                        placeholder="Enter item name..."
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Item type:</label>
                    <input
                        type="text"
                        id="type"
                        name="type" 
                        placeholder="Enter item type..."
                        required 
                    />
                </div>







                
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input 
                        type="text" 
                        id="color"
                        name="color" 
                        placeholder="Enter car color..."
                        required 
                    />
                </div>
                
                
                
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        ➕ Create Item
                    </button>
                    <a href={`/posts?token=${props.token}`} className="btn btn-secondary">
                        ← Back to All Items
                    </a>
                </div>
            </form>
        </Layout>
    )
}

module.exports = New