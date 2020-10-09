import React, { Component } from "react";
import { Header, MovieList, MovieDetails, Loading } from "./components";
import dataMovies from "./data";
import apiMovie from '../src/services/api.movie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: 0,
      loaded: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        movies: dataMovies,
        loaded: true
      });
    }, 1000);
  }

  updateSelectedMovie = index => {
    this.setState({
      selectedMovie: index
    });
  };

  async componentWillMount(){
    try {
      const {data} = await apiMovie.get("/discover/movie");
      console.log("DATA => ", data);
    } catch (error) {
      console.log("error => ", error);
    }
  }

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
