const React = require('react')
const Layout = require('../layouts/Layout')

function SignUp(props){
  return(
    <Layout>
      <div>
        <h1>Join Our Lexus Owners Community</h1>
        <form action="/users" method="POST">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>

        
            </form>
            
            <div className="text-center mt-3">
                <p>Already have an account? <a href="/users/signin">Sign in here</a></p>
            </div>
          </div>
    </Layout>
  )
}

module.exports = SignUp