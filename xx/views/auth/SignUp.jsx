const React = require('react')
const Layout = require('../layouts/Layout')

function SignUp() {
  return (
    <Layout>
      <div className="auth-container">
        <h1>Join Market-place</h1>
        <form action="/users/signup" method="POST">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
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
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (optional):</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
        <p>Already have an account? <a href="/users/login">Login here</a></p>
      </div>
    </Layout>
  )
}

module.exports = SignUp