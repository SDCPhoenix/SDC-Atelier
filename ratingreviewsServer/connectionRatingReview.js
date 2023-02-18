const {Pool} = require('pg')


const db = new Pool ({
  host: "localhost",
  port: 5432,
  database:"rating_reviews"
})

module.exports.db = db;