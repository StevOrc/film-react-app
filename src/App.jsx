import React, { Component } from "react";
import {
  Header,
  MovieList,
  MovieDetails,
  Loading,
  SearchBar,
} from "./components";
import apiMovie, { apiMovieMap } from "../src/services/api.movie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: 0,
      loaded: false,
    };
  }

  async componentDidMount() {
    try {
      const {
        data: { results },
      } = await apiMovie.get("/discover/movie");
      const movies = apiMovieMap(results);
      this.updateMovies(movies);
    } catch (error) {
      console.log("error => ", error);
    }
  }

  updateMovies = (movies) => {
    this.setState({
      movies,
      loaded: true,
    });
  };

  updateSelectedMovie = (index) => {
    this.setState({
      selectedMovie: index,
    });
  };

  render() {
    return (
      <div className="App d-flex flex-column">
        <Header />
        <SearchBar updateMovies={this.updateMovies} />
        {this.state.loaded ? (
          <div className="d-flex flex-row flex-fill pt-4 p-2">
            <MovieList
              movies={this.state.movies}
              updateSelectedMovie={this.updateSelectedMovie}
            />
            {/* <MovieDetails movie={this.state.movies[this.state.selectedMovie]} /> */}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default App;
