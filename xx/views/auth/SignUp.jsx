const React = require('react');
const Layout = require('../layouts/Layout');

function SignUp({ token }) {
  return (
    <Layout title="Create Account" token={token}>
      <div className="page form-page">
        <h1 className="page-title">Join Lexus Community</h1>
        <form action="/users/signup" method="POST" autoComplete="off">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input name="name" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input name="username" id="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input name="email" id="email" type="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" id="password" type="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input name="location" id="location" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input name="phone" id="phone" />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">Create Account</button>
        </form>
        <p className="muted">Already have an account? <a href="/users/login">Login</a></p>
      </div>
    </Layout>
  );
}
module.exports = SignUp;
