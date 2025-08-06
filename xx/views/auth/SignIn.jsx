const React = require('react')
const Layout = require('../layouts/Layout')

function SignIn() {
  return (
    <Layout>
      <div className="auth-container">
        <h1>Welcome Back</h1>
        <form action="/users/login" method="POST">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p>Don't have an account? <a href="/users/signup">Sign up here</a></p>
      </div>
    </Layout>
  )
}

module.exports = SignIn