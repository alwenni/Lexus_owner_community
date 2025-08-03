const React = require('react')
const Layout = require('../layouts/Layout')

function SignUp(){
  return(
    <Layout>
      <div>
        <h1>Join Our Blog Community</h1>
        <form action="/authors" method="POST">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
        <p>Already have an account? <a href="/authors/login">Sign In</a></p>
      </div>
    </Layout>
  )
}

module.exports = SignUp