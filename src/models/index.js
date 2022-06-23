const dbConfig = require('../configs/db.config')

const mongoose = require('mongoose')

mongoose.connect('mongodb://' + dbConfig.database_user + ':' + dbConfig.database_password + '@' + dbConfig.database_host + ':27017/', { dbName: dbConfig.database_name })

const db = {}

db.connection = mongoose.connection

db.User = mongoose.model('users', require('../models/users.model')(mongoose))
db.Session = mongoose.model('sessions', require('../models/sessions.model')(mongoose))

module.exports = db