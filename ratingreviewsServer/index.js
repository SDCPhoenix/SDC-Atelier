require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
const app = express();
let db = require('./connectionRatingReview.js').db;
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(compression());
// app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '../public')));



app.get('/reviews', (req, res) => {
  console.log('in reviews')
  db.query(`SELECT * FROM reviews_etl WHERE product_id = ${req.query.productID}`).then((data) => {
    res.send(data.rows)
  })
});

app.get('/loaderio-8c1f0b1bf6148fc8a56974ede51e99a2/', (req, res) => {
    res.send('loaderio-8c1f0b1bf6148fc8a56974ede51e99a2')
});


app.get('/sortedReviews', (req, res) => {

  var query =  req.query.option.toLowerCase();
  if(query  === 'helpful') {
      db.query(`SELECT * FROM reviews_etl WHERE product_id=${req.query.productID} ORDER BY helpfulness DESC`).then((data) => {
        res.send(data.rows)
      })
    }
  if(query === 'relevance') {
    db.query(`SELECT * FROM reviews_etl WHERE product_id=${req.query.productID} ORDER BY helpfulness DESC, date DESC`).then((data) => {
      res.send(data.rows)
    })
  }
  if(query === 'newest') {
    db.query(`SELECT * FROM reviews_etl WHERE product_id=${req.query.productID} ORDER BY date DESC`).then((data) => {
      console.log('THIS IS RELEVANCE', data.rows)
      res.send(data.rows)
    })
  }
});

app.post('/helpfulR', (req, res) => {
  db.query(`UPDATE reviews_etl SET helpfulness = helpfulness + 1  WHERE  id = ${req.body.review_id}`).then((data) => {
  res.send(202);
})
 });

 app.put('/reportR', (req, res) => {
  db.query(`UPDATE reviews_etl SET reported = true WHERE id = ${req.body.review_id}`).then(() => {
    res.send(202)
  })
});


app.post('/postReview', (req, res) => {
  // req.body.product_id = Number(req.body.product_id);
  req.body.rating = Number(req.body.rating);
  var date = new Date();
  req.body.date = date.getTime();
  console.log(req.body)
  db.query(`INSERT INTO reviews_etl ( product_id, rating, date, summary, body, recommend,reviewer_name, reviewer_email) VALUES ( ${req.body.product_id}, ${req.body.rating}, ${req.body.date}, '${req.body.summary}', '${req.body.body}', ${req.body.recommend}, '${req.body.name}', '${req.body.email}' )`).then(() => {
    res.send(202);
  })
});

app.get('/metadata', (req, res) => {
  console.log('in meta data');
  var id = req.query.productID;
  var metadata = {ratings:
{}};
  // console.log(`SELECT * FROM characteristics_etl INNER JOIN character_reviews_etl ON characteristics_etl.id = character_reviews_etl.characteristics_id WHERE product_id = ${id};`);
  db.query(`SELECT * FROM characteristics_etl INNER JOIN character_reviews_etl ON characteristics_etl.id = character_reviews_etl.characteristics_id WHERE product_id = ${id}`).then((data) => {
    data.rows.forEach((row) => {
      metadata.ratings[row.name] = row.value
    })
    console.log('this is metadata', metadata);
    res.send(metadata);

  })
});

// app.listen(process.env.PORT);

app.listen(process.env.PORT);

console.log(`Server listening at http://localhost:${process.env.PORT}`);