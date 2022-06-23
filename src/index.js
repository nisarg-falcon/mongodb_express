const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const userRoutes = require('./routes/user.routes')

const db = require('./models')

const app = express()

db.connection.on('open', (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log('mongodb connected !')
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server running at ' + process.env.PORT)
})