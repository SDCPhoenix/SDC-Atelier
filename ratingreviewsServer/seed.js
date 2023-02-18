const fs = require("fs");
const { parse } = require("csv-parse");
// const csv_parse = require("fast-csv");
const pgp = require('pg-promise')({});
const {ParameterizedQuery: PQ} = require('pg-promise');
const db = pgp("postgres://localhost:5432/rating_reviews");
// let db = require('./connectionRatingReview.js').db;



// const readcsv = (csvFile) => {
//   let data = [];
//     fs.createReadStream(csvFile).pipe(parse( { delimiter: ',', from_line: 2}))
//     .on("data", function(row) {
//       data.push(row)
//     })
//     .on("end", function() {
//       const cs = new pgp.helpers.ColumnSet(['id','product_id','rating','date','summary','body','recommend','reported','reviewer_name','reviewer_email','response','helpfuless'], {table: 'reviews_etl'});
//       const query = pgp.helpers.insert(data, cs);
//       db.many(query);
//       console.log('finished')
//     })
// }


// readcsv('./ratingreviewsServer/reviews.csv')




const readcsv = (table, location) => {
  db.query(`COPY ${table} FROM '${location}'  DELIMITER ',' CSV HEADER`).then(() => {
    console.log('Success')
  }).catch((err) => {
    console.log('this is err', err)
  })
}

// readcsv('reviews_etl','/Users/soniaramlall/hello/SDC-Atelier/ratingreviewsServer/reviews.csv')
// readcsv('characteristics_etl ', '/Users/soniaramlall/hello/SDC-Atelier/ratingreviewsServer/characteristics.csv')
// readcsv('character_reviews_etl', '/Users/soniaramlall/hello/SDC-Atelier/ratingreviewsServer/characteristic_reviews.csv')
readcsv('review_photos', '/Users/soniaramlall/hello/SDC-Atelier/ratingreviewsServer/reviews_photos.csv')


