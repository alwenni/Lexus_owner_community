const React = require('react')
const Layout = require('../layouts/Layout')

function Index({ posts, token }){
  return(
    <Layout>
      <div>
        <h1>My Blog Posts</h1>
        <a href={`/posts/new?token=${token}`} className="btn btn-primary">Create New Post</a>
        
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
              <div className="post-meta">
                <span className={`post-status ${post.published ? 'published' : 'draft'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="post-actions">
                <a href={`/posts/${post._id}?token=${token}`} className="btn btn-secondary">View</a>
                <a href={`/posts/${post._id}/edit?token=${token}`} className="btn btn-secondary">Edit</a>
                <form action={`/posts/${post._id}?_method=DELETE&token=${token}`} method="POST" style={{display: 'inline'}}>
                  <button type="submit" className="btn btn-danger">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

module.exports = Index