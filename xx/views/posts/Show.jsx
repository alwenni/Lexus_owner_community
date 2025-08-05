const React = require('react')
const Layout = require('../layouts/Layout')

function Show(props){
    return(
        <Layout fruit={props.post}>
            <h1> {props.post.name}</h1>
            
            <div className="item-card">
                <div className="item-name">{props.post.name}</div>
                <div className="item-color">Color: {props.post.color}</div>
                
                
                
                <div className="d-flex gap-2">
                    <a href={`/posts?token=${props.token}`} className="btn btn-secondary">
                        ← Back to All Items
                    </a>
                    <a href={`/posts/${props.post._id}/edit?token=${props.token}`} className="btn btn-primary">
                        ✏️ Edit {props.post.name}
                    </a>
                </div>
                
                <div className="mt-3">
                    <form action={`/posts/${props.post._id}?_method=DELETE&token=${props.token}`} method="POST">
                        <button type="submit" className="btn btn-danger">
                            🗑️ Delete {props.post.name}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

module.exports = Show