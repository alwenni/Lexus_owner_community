const React = require('react')
const Layout = require('../layouts/Layout')

function Edit (props) {
    const { name,color,model,price,condition,contact,distance,accidents,specifications } = props.posts

    return(
        <Layout car={props.car}>
            <h1>✏️ Edit Your Item {name}</h1>

            <form action={`/posts/${_id}?_method=PUT&token=${props.token}`} method="POST">
                <div className="form-group">
                    <label htmlFor="name">Item Name:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        defaultValue={name}
                        placeholder="Enter car name..."
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input 
                        type="text" 
                        id="color"
                        name="color" 
                        defaultValue={color}
                        placeholder="Enter the ca color..."
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input 
                        type="text" 
                        id="model"
                        name="model" 
                        defaultValue={model}
                        placeholder="Enter the car model..."
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="number" 
                        id="price"
                        name="price" 
                        defaultValue={price}
                        placeholder="Enter the car price..."
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="condition">Condition:</label>
                    <input 
                        type="text" 
                        id="condition"
                        name="condition" 
                        defaultValue={condition}
                        placeholder="Enter the car condition..."
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input 
                        type="text" 
                        id="contact"
                        name="contact" 
                        defaultValue={contact}
                        placeholder="Enter your contact information..."
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="distance">Distance:</label>
                    <input 
                        type="number" 
                        id="distance"
                        name="distance" 
                        defaultValue={distance}
                        placeholder="Enter the car distance..."
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accidents">Accidents:</label>
                    <input 
                        type="number" 
                        id="accidents"
                        name="accidents" 
                        defaultValue={accidents}
                        placeholder="Enter the car accident history..."
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="specifications">Specifications:</label>
                    <textarea 
                        id="specifications"
                        name="specifications" 
                        defaultValue={specifications}
                        placeholder="Enter the car specifications..."
                        required 
                    />
                </div>

                
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        💾 Update Item
                    </button>
                    <a href={`/posts/${_id}?token=${props.token}`} className="btn btn-secondary">
                        ← Back to {name}
                    </a>
                </div>
            </form>
        </Layout>
    )
}

module.exports = Edit