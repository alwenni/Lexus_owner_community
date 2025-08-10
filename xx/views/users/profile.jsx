const React = require('react');
const Layout = require('../layouts/Layout');

function Profile({ user, token }) {
  return (
    <Layout title="My Profile" token={token} user={user}>
      <div className="page">
        <h1 className="page-title">My Profile</h1>
        <div className="panel">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Location:</strong> {user?.location || '—'}</p>
          <p><strong>Phone:</strong> {user?.phone || '—'}</p>
        </div>
        <div className="actions">
          <a className="btn" href="/cars">My Cars</a>
          <a className="btn" href="/parts">My Parts</a>
        </div>
      </div>
    </Layout>
  );
}
module.exports = Profile;
