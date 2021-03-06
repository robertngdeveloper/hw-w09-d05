import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import MovieList from '../MovieList/MovieList';
import Nav from '../Nav/Nav';
import SearchHeader from '../SearchHeader/SearchHeader';
// import logo from '../../logo.svg';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      movies: [],
      // totalResults: 0
      result: {}
    };
  }

  getAllMovies() {
    console.log('app.jsx');
    // fetch must be made to middleware route. Client will never see this
    fetch(`/movies`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        movies: data
      });
      // console.log(this.state);
    })
    .catch(err => console.log(err));
  }

  deleteFromDb(id) {
    console.log('deleteFromDb');
    fetch(`/movies/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const movies = this.state.movies.filter((mov) => {
        return mov.id !==id;
      });
      this.setState({ movies });
    })
    .catch(err => console.log(err));
  }



  updateInput(e) {
    // let movieTitle = e.target.value;
    this.setState({
      // searchTerm: movieTitle
      searchTerm: e.target.value
    })
    console.log(this.state.searchTerm);
  }


  searchMovies(searchTerm) {
    console.log('searchMovies function');
  fetch(`http://www.omdbapi.com/?t=${this.state.searchTerm}`)
  .then(r => r.json())
  .then((found) => {
    this.setState({
      result: found
    });
  })
  .catch(err => console.log(err));
}

  addToDb(e) {
    return fetch(`/movies`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state.result)
    })
    .then(() => {
      this.getAllMovies();
    })
    .catch()
  }


// binding due to scope issue. this.setstate is within a function
  render() {
    return (
      <div className="App">
        <Nav />
        <SearchHeader
          name={this.state.searchTerm}
          userInput={this.updateInput.bind(this)}
          search={()=> this.searchMovies()}
          result={this.state.result}
          addToDb={this.addToDb.bind(this)}
        />
        <MovieList
          movies={this.state.movies}
          getAllMovies={this.getAllMovies.bind(this)}
          deleteFromDb={this.deleteFromDb.bind(this)}
        />
        <Footer />
      </div>
    );
  }
}

// export default App;
