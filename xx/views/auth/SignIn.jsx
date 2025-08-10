const React = require('react');
const Layout = require('../layouts/Layout');

function SignIn({ token }) {
  return (
    <Layout title="Login" token={token}>
      <div className="page form-page">
        <h1 className="page-title">Welcome Back</h1>
        <form action="/users/login" method="POST" autoComplete="on">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" required />
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
        <p className="muted">Don’t have an account? <a href="/users/signup">Create one</a></p>
      </div>
    </Layout>
  );
}
module.exports = SignIn;
