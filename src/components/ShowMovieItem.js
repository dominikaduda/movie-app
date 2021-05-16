import React, {Fragment } from 'react';
import { omdbAPIFilmByImdbID } from '../utils/omdbAPI';

export default class ShowMovieItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {},
            usersScore: 0,
            userScore: 0
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id; // we grab the ID from the URL
        const data = await omdbAPIFilmByImdbID(id);
        console.log(id);
        console.log(data);
        this.setState({ movie: data });
        console.log(this.state.movie);
    }

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Movie Information</h1>
                </div>
                <div className="content-container">
                    <form className="form" onSubmit={this.onTitleSubmit}>
                        {this.state.error && <p className="form__error">{this.state.error}</p>}
                        <div className="content-container">
                                <img src={this.state.movie.Poster}></img>
                        </div>
                        <div className="list-body">
                            <div className="list-item">Title: {this.state.movie.Title} </div>
                            <div className="list-item">Year: {this.state.movie.Year}</div>
                            <div className="list-item">imdbID: {this.state.movie.imdbID}</div>
                            <div className="list-item">Type: {this.state.movie.Type}</div>
                            <div className="list-item">Genre: {this.state.movie.Genre}</div>
                            <div className="list-item">Plot: {this.state.movie.Plot}</div>
                            <div className="list-item">imdbRating: {this.state.movie.imdbRating}</div>
                            <div className="list-item">UsersScore: {this.state.usersScore}</div>
                            <div className="list-item">MyScore: {this.state.userScore}</div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}