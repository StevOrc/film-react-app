import React, { Component } from 'react';
import Style from './MovieElement.module.scss';

export default class MovieElement extends Component {


  handleOnClick = () => {
    this.props.updateSelectedMovie(this.props.movie.title);
  }

  render() {
    return (
      <div onClick={ this.handleOnClick } className={ "d-flex flex-row bg-light " + Style.container }>
        <img alt="film" width="185"  src={ this.props.movie.img }  />
        <div className="flex-fill d-flex flex-column p-3 w-100">
          <h5>{ this.props.movie.title }</h5>
          <hr className="w-100" />
          <p>{ this.props.movie.details }</p>
        </div>
      </div>
    );
    
  }

}