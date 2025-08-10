// views/layouts/Layout.jsx
const React = require('react');

function addToken(url, token) {
  if (!token) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}token=${encodeURIComponent(token)}`;
}

function Layout({ title = 'Lexus', token, user, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        {/* خلّيناه بدون ستايل الآن – بنضيف CSS لاحقاً */}
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <nav className="topbar">
          <a className="brand" href="/">Lexus Community</a>

          <a href="/cars">Cars</a>
          <a href="/parts">Parts</a>

          <div className="spacer" style={{ flex: 1 }} />

          {token ? (
            <>
              <a href={addToken('/cars/new', token)}>Sell Car</a>
              <a href={addToken('/parts/new', token)}>Sell Part</a>
              <a href={addToken('/users/profile', token)}>My Profile</a>
              {/* إن كان عندك مسار لعمل لوج آوت غيّر الرابط */}
              <a href="/users/login">Logout</a>
            </>
          ) : (
            <>
              <a href="/users/login">Login</a>
              <a className="btn btn-primary" href="/users/signup">Sign Up</a>
            </>
          )}
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}

module.exports = Layout;
