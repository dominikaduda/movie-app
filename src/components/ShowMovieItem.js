import React, {Fragment } from 'react';
import { connect } from 'react-redux';
import { omdbAPIFilmByImdbID } from '../utils/omdbAPI';
import { startAddMovieLocal, startAddMovieFavourite, startAddMovieGlobal } from '../actions/movies';
import database from '../firebase/firebase';
import * as firebase from 'firebase';

export class ShowMovieItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {},
            usersScore: 0,
            userScore: 0,
            favourite: 'no',
            prevUserScore: 0
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const data = await omdbAPIFilmByImdbID(id);
        this.setState({ movie: data });

        const uid = firebase.auth().currentUser.uid;
        database.ref(`users/${uid}/movies`).orderByChild('imdbID').equalTo(id).once('value').then((snapshot) => {
            if (snapshot.exists()){

                snapshot.forEach((childSnapshot) => {
                    this.setState(() => ({ 
                        userScore: parseFloat(childSnapshot.val().userScore),
                        favourite: childSnapshot.val().favourite,
                        prevUserScore: parseFloat(childSnapshot.val().userScore)
                    }));
                });
            }
        });
        database.ref(`movies`).orderByChild('imdbID').equalTo(id).once('value').then((snapshot) => {
            if (snapshot.exists()){

                snapshot.forEach((childSnapshot) => {
                    this.setState(() => ({ 
                        usersScore: parseFloat(childSnapshot.val().usersScore)
                    }));
                });
            }
        });
    }

    async componentDidUpdate() {
        
    }

    onFavouriteClick = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            favourite: 'yes'
        }));
        /*const movieImdbID = {
            imdbID: this.state.movie.imdbID
        };
        this.props.startAddMovieFavourite(movieImdbID);
        alert("Film " + movieImdbID.imdbID + " added to favourites!");*/

        /*const id = this.props.match.params.id;
        this.props.startAddMovieFavourite({imdbID: id});
        alert("Film " + id + " added to favourites!");*/
    }
    onRemoveFavouriteClick = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            favourite: 'no'
        }));
        /*const id = this.props.match.params.id;
        alert("Film " + id  + " removed from favourites!");*/
    }

    onScoreChange = (e) => {
        const scoreValue = e.target.value;
        
        if(scoreValue.match(/^\d*$/)){
            if((scoreValue >= 1) && (scoreValue <= 10)) {
                this.setState((prevState) => ({
                    userScore: scoreValue
                }));
                this.setState(() => ({ error: '' }));
                
            } else {
                this.setState(() => ({ error: 'Score must be between 1 and 10.' }));
            }
        } else {
            this.setState(() => ({ error: 'Score must be natural number between 1 and 10.' }));
        }
    }

    onSubmitClick = (e) => {
        e.preventDefault();
        
        if (this.state.userScore===0 && this.state.favourite==='no') {
            this.setState(() => ({ error: 'Please provide score or add to favourite.' }));
        } else {
            this.setState((prevState) => ({ 
                error: '',
                prevUserScore: prevState.userScore
            }));

            const movieLocalData = {
                imdbID: this.state.movie.imdbID,
                userScore: parseFloat(this.state.userScore),
                favourite: this.state.favourite,
                ifScoredBefore: this.state.userScore!==0 ? 'yes' : 'no',
                prevUserScore: parseFloat(this.state.prevUserScore)
            }
            this.props.startAddMovieLocal(movieLocalData);
            alert("Change submitted!");
            
            if(this.state.userScore!==0){
                const movieGlobalData = {
                    imdbID: this.state.movie.imdbID,
                    userScore: parseFloat(this.state.userScore)
                }
                this.props.startAddMovieGlobal(movieGlobalData);
            }
            const id = this.props.match.params.id;
            this.props.history.push(`/`);
            //this.props.history.push(`/movie/${id}`);
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
                                    
                                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                                </div>
                            </div>
                            <div className="list-item">
                                Favourite: {this.state.favourite}
                                <div className="list-item__data">
                                    {this.state.favourite ==='no' ? <span className="heart__gray" onClick={this.onFavouriteClick}></span> : <span className="heart" onClick={this.onRemoveFavouriteClick}></span> }
                                </div>
                            </div>
                            <div className="list-item">
                                <div className="list-item__button">
                                    <button className="button" onClick={this.onSubmitClick}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    startAddMovieLocal: (movie) => dispatch(startAddMovieLocal(movie)),
    startAddMovieFavourite: (movie) => dispatch(startAddMovieFavourite(movie)),
    startAddMovieGlobal: (movie) => dispatch(startAddMovieGlobal(movie))
});

export default connect(undefined, mapDispatchToProps)(ShowMovieItem);