import React, {Fragment } from 'react';
import { omdbAPIFilmByImdbID } from '../utils/omdbAPI';

export default class ShowMovieItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {},
            usersScore: '',
            userScore: '',
            favourite: 'no'
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

    onFavouriteClick = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            favourite: 'yes'
        }));
    }
    onRemoveFavouriteClick = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            favourite: 'no'
        }));
    }

     //---------needs update
    onScoreChange = (e) => {
        const scoreValue = e.target.value;
        if((scoreValue >= 1) && (scoreValue <= 10)) {
            this.setState((prevState) => ({
                userScore: scoreValue
            }));
            this.setState(() => ({ error: '' }));
        } else {
            this.setState(() => ({ error: 'Score must be between 1 and 10.' }));
        }
    }

    onSubmitClick = (e) => {
        e.preventDefault();
        const score = e.target.value;
        
        if (this.state.userScore==='') {
            this.setState(() => ({ error: 'Please provide score.' }));
        } else {
            this.setState(() => ({ userScore: score }));
            this.setState(() => ({ error: '' }));
        }
    }

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Movie Information</h1>
                </div>
                <div className="content-container">
                    <form className="form" onSubmit={this.onTitleSubmit}>
                        <div className="content-container">
                                <img src={this.state.movie.Poster} alt='movie'></img>
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
                            <div className="list-item">
                                MyScore: {this.state.userScore}
                                <div className="list-item__data">
                                    <input
                                        type="number"
                                        placeholder="Type your score here..."
                                        autoFocus
                                        value={this.state.userScore}
                                        className="text-input"
                                        onChange={this.onScoreChange}
                                    />
                                    <button className="button" onClick={this.onSubmitClick}>Submit</button>
                                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                                </div>
                            </div>
                            <div className="list-item">
                                Favourite: {this.state.favourite}
                                <div className="list-item__data">
                                    {this.state.favourite ==='no' ? <span className="heart__gray" onClick={this.onFavouriteClick}></span> : <span className="heart" onClick={this.onRemoveFavouriteClick}></span> }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}