import axios from "axios";
import config from "../config.json";

const apiEndpoint = "https://api.themoviedb.org/4";

const apiMovie = axios.create({
  baseURL: apiEndpoint,
});

apiMovie.interceptors.request.use((req) => {
  req.headers["Authorization"] = `Bearer ${config.Token}`;
  return req;
});

export default apiMovie;

export const apiMovieMap = (results) => {
  return results.map((el) => {
    return {
      img: "https://image.tmdb.org/t/p/w500" + el.poster_path,
      title: el.title,
      details:
        el.release_date +
        " | " +
        el.vote_average +
        " /10 (" +
        el.vote_count +
        ")",
      description: el.overview,
    };
  });
};
