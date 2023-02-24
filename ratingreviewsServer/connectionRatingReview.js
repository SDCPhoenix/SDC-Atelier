const {Pool} = require('pg')
require('dotenv').config();


const db = new Pool ({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database:process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  user: 'postgres'
})

module.exports.db = db;


// scp -i /Users/soniaramlall/Desktop/SDC/SDC-phoenix.pem /Users/soniaramlall/SDC-Atelier/ratingreviewsServer/reviews.csv ec2-3-239-122-119.compute-1.amazonaws.com:path/to/file;
// scp -i /Users/soniaramlall/Desktop/SDC/SDC-phoenix.pem ~/Users/soniaramlall/SDC-Atelier/ratingreviewsServer/reviews.csv ubuntu@ip-3-239-122-119:~/data