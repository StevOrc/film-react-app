import React, { Component } from "react";
import { Formik } from "formik";
import apiMovie, { apiMovieMap } from "../../services/api.movie";

export default class SearchBar extends Component {
  submit = async (values, actions) => {
    try {
      const query = `?${Object.keys(values)
        .map((k) => `${k}=${values[k]}&`)
        .join("")}`;
      //   console.log(query);
      const {
        data: { results },
      } = await apiMovie.get(`search/movie${query}`);
      const movies = apiMovieMap(results);
      this.props.updateMovies(movies);
      actions.setSubmitting(false);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  render() {
    return (
      <Formik
        onSubmit={this.submit}
        initialValues={{ query: "", language: "en-US" }}
      >
        {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form className="d-flex flex-row p-2 m-2" onSubmit={handleSubmit}>
            <input
              name="query"
              className="flex-fill form-control mr-2"
              placeholder="Search..."
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <select
              name="language"
              className="mr-2 form-control w-25"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="en-US">Anglais</option>
              <option value="fr-FR">Français</option>
            </select>
            <button
              className="btn btn-small btn-success"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    );
  }
}
