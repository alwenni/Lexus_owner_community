require('dotenv').config()
const app = require('./app')
require('./config/db').connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Market-place server running on port ${PORT}`)
})