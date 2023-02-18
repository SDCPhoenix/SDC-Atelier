CREATE DATABASE rating_reviews;


CREATE TABLE reviews_etl (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
);


CREATE TABLE  characteristics_etl (
  id  BIGSERIAL PRIMARY KEY,
  product_id INTEGER,
  name TEXT
);

CREATE TABLE character_reviews_etl (
  id  BIGSERIAL PRIMARY KEY,
  characteristics_id INTEGER REFERENCES characteristics_etl(id),
  review_id INTEGER REFERENCES reviews_etl(id),
  value INTEGER
);

CREATE TABLE review_photos (
  id  BIGSERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews_etl(id),
  url TEXT

);


-- psql < ratingreviewsServer/reviewsratingSchema.sql


