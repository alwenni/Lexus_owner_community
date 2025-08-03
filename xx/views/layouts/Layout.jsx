const React = require('react')

function Layout(props){
 return(
    <html>
        <head>
            <title>{!props.post?.title ? 'Blog App - Share Your Stories' : `${props.post.title} - Blog App`}</title>
            <link rel="stylesheet" href="/styles.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
            <div className="container">
                {props.children}
            </div>
        </body>
    </html>
 )
}

module.exports = Layout