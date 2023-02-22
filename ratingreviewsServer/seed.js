const fs = require("fs");
require('dotenv').config();
const { parse } = require("csv-parse");
const Papa = require('papaparse');
const pgp = require('pg-promise')({});
const {ParameterizedQuery: PQ} = require('pg-promise');
// const db = pgp("postgres://localhost:5432/rating_reviews");
let db = require('./connectionRatingReview.js').db;
const format = require('pg-format');
// const detectNewlineAtEof = require('detect-newline-at-eof')

let data = [];
let start = 0;
const readcsv = (path, num) => {
  let start = 0;
  var configures = {
    delimiter: ",",	// auto-detect
    newline: "",	// auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: false,
    transformHeader: undefined,
    dynamicTyping: true,
    preview: 0,
    encoding: "utf-8",
    worker: false,
    comments: false,
    step: undefined,
    complete: function(results, file) {
      console.log('Parsing complete');
    },
    error: function(err) {
      console.log(err);
    },
    download: false,
    downloadRequestHeaders: undefined,
    downloadRequestBody: undefined,
    skipEmptyLines: true,
    chunk:  function(results, parser) {
      data = results.data;
      if(start === 0 ) {
      data.splice(0, 1);
      start = 1;
      }
      if(data.length !== 0  && num === 1 ) {
        var sql = format("INSERT INTO reviews_etl (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES %L " ,(results.data))
        db.query(sql).then(()=> {
        });
      }
      if(data.length !== 0  && num === 2 ) {
        var sql = format("INSERT INTO characteristics_etl (id, product_id, name) VALUES %L " ,(results.data))
        db.query(sql).then(()=> {
        });
      }
      if(data.length !== 0  && num === 3 ) {
        var sql = format("INSERT INTO character_reviews_etl (id, characteristics_id, review_id, value) VALUES %L " ,(results.data))
        db.query(sql).then(()=> {
        });
      }
      if(data.length !== 0  && num === 4 ) {
        var sql = format("INSERT INTO review_photos (id, review_id, url) VALUES %L " ,(results.data))
        db.query(sql).then(()=> {
        });
      }
    }, // use later to seed to db
    chunkSize: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
  }
  Papa.parse(fs.createReadStream(path), configures);
  }

// readcsv('/Users/soniaramlall/SDC-Atelier/ratingreviewsServer/reviews.csv', 1);
// readcsv('/Users/soniaramlall/SDC-Atelier/ratingreviewsServer/characteristics.csv', 2);
// readcsv('/Users/soniaramlall/SDC-Atelier/ratingreviewsServer/characteristic_reviews.csv', 3);
readcsv('/Users/soniaramlall/SDC-Atelier/ratingreviewsServer/reviews_photos.csv', 4)

