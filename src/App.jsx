import React, { Component } from "react";
import { Header, MovieList, MovieDetails, Loading } from "./components";
import apiMovie from "../src/services/api.movie";

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
      const {data: { results }} = await apiMovie.get("/discover/movie");
      console.log("aaaa", results);
      const movies = results.map( el => {
        return {
          img: 'https://image.tmdb.org/t/p/w500' + el.poster_path,
          title: el.title,
          details: el.release_date + ' | ' + el.vote_average + ' /10 (' + el.vote_count + ')',
          description: el.overview
        }
      })
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
        {this.state.loaded ? (
          <div className="d-flex flex-row flex-fill pt-4 p-2">
            <MovieList
              movies={this.state.movies}
              updateSelectedMovie={this.updateSelectedMovie}
            />
            <MovieDetails movie={this.state.movies[this.state.selectedMovie]} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default App;
