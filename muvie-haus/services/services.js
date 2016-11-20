const fetch = require('node-fetch');
const API_URL = "http://www.omdbapi.com/?";

function searchMovies(req,res,next) {
  console.log(req.query);
  fetch(`${API_URL}t=${req.query.movie}&y=&plot=short&r=json`)
  .then(results => results.json())
  .then((results) => {
    res.movies = results;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { searchMovies };
