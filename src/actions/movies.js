import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_MOVIE_LOCAL
export const addMovieLocal = (movie) => ({
    type: 'ADD_MOVIE_LOCAL',
    movie
});

export const startAddMovieLocal = (movieData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            imdbID = '',
            userScore = 0,
            favourite = 'no',
            ifScoredBefore = 'no',
            prevUserScore = 0
        } = movieData;
        const movie = { imdbID, userScore, favourite, ifScoredBefore, prevUserScore };


        //check if already exists
        database.ref(`users/${uid}/movies`).orderByChild('imdbID').equalTo(imdbID).once('value').then((snapshot) => {
            if (snapshot.exists()){

                snapshot.forEach((childSnapshot) => {
                    
                    const editedMovie = {
                        favourite: movieData.favourite,
                        imdbID: movieData.imdbID,
                        userScore: movieData.userScore,
                        ifScoredBefore: ifScoredBefore,
                        prevUserScore: childSnapshot.val().userScore
                    }

                    return database.ref(`users/${uid}/movies/${childSnapshot.key}`).update(editedMovie).then(() => {
                        dispatch(editMovie(childSnapshot.key, editedMovie));
                    });

                });
                
            } else {
                return database.ref(`users/${uid}/movies`).push(movie).then((ref) => {
                    dispatch(addMovieLocal({
                        id: ref.key,
                        ...movie
                    }));
                });
            }
        });
    };
};

// ADD_MOVIE_TO_FAVOURITE
export const addMovieFavourite = (movie) => ({
    type: 'ADD_MOVIE_TO_FAVOURITE',
    movie
});

export const startAddMovieFavourite = (movieData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            imdbID = '',
        } = movieData;
        const movie = { imdbID };

        return database.ref(`users/${uid}/favourites`).push(movie).then((ref) => {
            dispatch(addMovieFavourite({
                id: ref.key,
                ...movie
            }));
        });
    };
};

// ADD_MOVIE_GLOBAL
export const addMovieGlobal = (movie) => ({
    type: 'ADD_MOVIE_GLOBAL',
    movie
});

export const startAddMovieGlobal = (movieData = {}, userScore) => {
    return (dispatch, getState) => {     
        const uid = getState().auth.uid;
        const {
            imdbID = '',
            submittedVotesCounter = 0,
            submittedVotesSum = 0,
            usersScore = 0,
            userScore = 0
        } = movieData;

        let ifScoredBefore ='no';
        let prevUserScore = 0;
        database.ref(`users/${uid}/movies`).orderByChild('imdbID').equalTo(imdbID).once('value').then((snapshot) => {
            if (snapshot.exists()){

                snapshot.forEach((childSnapshot) => {
                    ifScoredBefore = childSnapshot.val().ifScoredBefore;
                    prevUserScore = parseFloat(childSnapshot.val().userScore);
                });
            } else {
                ifScoredBefore='no'
            }
        });

        database.ref(`movies`).orderByChild('imdbID').equalTo(imdbID).once('value').then((snapshot) => {
            if (snapshot.exists()){
              const data = snapshot.val();
                
                snapshot.forEach((childSnapshot) => {

                    const editedMovieGlobal = {
                        imdbID: imdbID,
                        submittedVotesCounter: ifScoredBefore==='yes' ? parseFloat(childSnapshot.val().submittedVotesCounter) : parseFloat(childSnapshot.val().submittedVotesCounter + 1),
                        submittedVotesSum: parseFloat(childSnapshot.val().submittedVotesSum) - prevUserScore + parseFloat(userScore),
                        usersScore: (parseFloat(submittedVotesCounter) === 0) ? 0 : ((parseFloat(submittedVotesSum) / parseFloat(submittedVotesCounter)))
                    }
                    const editedMovieGlobal2 = {
                        imdbID: imdbID,
                        submittedVotesCounter: editedMovieGlobal.submittedVotesCounter,
                        submittedVotesSum: editedMovieGlobal.submittedVotesSum,
                        usersScore: (parseFloat(editedMovieGlobal.submittedVotesCounter) === 0) ? 0 : ((parseFloat(editedMovieGlobal.submittedVotesSum) / parseFloat(editedMovieGlobal.submittedVotesCounter)))
                    }

                    return database.ref(`movies/${childSnapshot.key}`).update(editedMovieGlobal2).then(() => {
                        dispatch(editMovie(childSnapshot.key, editedMovieGlobal2));
                    });

                });

            } else {
                const movie = { 
                    imdbID: imdbID, 
                    submittedVotesCounter: submittedVotesCounter + 1,
                    submittedVotesSum: submittedVotesSum + movieData.userScore,
                    usersScore: (parseFloat(submittedVotesCounter) === 0) ? 0 : ((parseFloat(submittedVotesSum) / parseFloat(submittedVotesCounter)))
                }
                const movie2 = { 
                    imdbID: imdbID, 
                    submittedVotesCounter: movie.submittedVotesCounter,
                    submittedVotesSum: movie.submittedVotesSum,
                    usersScore: (parseFloat(movie.submittedVotesCounter) === 0) ? 0 : ((parseFloat(movie.submittedVotesSum) / parseFloat(movie.submittedVotesCounter)))
                }

                return database.ref(`movies`).push(movie2).then((ref) => {
                    dispatch(addMovieGlobal({
                        id: ref.key,
                        ...movie2
                    }));
                });
            }
        });
    };
};

// REMOVE_MOVIE_FROM_FAVOURITE
export const removeMovieFavourite = ({ id } = {}) => ({
    type: 'REMOVE_MOVIE_FROM_FAVOURITE',
    id
});

export const startRemoveMovieFavourite = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/favourites/${id}`).remove().then(() => {
            dispatch(removeMovieFavourite({ id }));
        });
    };
};

// EDIT_MOVIE
export const editMovie = (id, updates) => ({
    type: 'EDIT_MOVIE',
    id,
    updates
});

export const startEditMovie = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/movies/${id}`).update(updates).then(() => {
            dispatch(editMovie(id, updates));
        });
    };
};


// SET_MOVIES
export const setMoviesLocal = (movies) => ({
    type: 'SET_MOVIES_LOCAL',
    movies
});

export const startSetMoviesLocal = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/movies`).once('value').then((snapshot) => {
            const movies = [];

            snapshot.forEach((childSnapshot) => {
                movies.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setMoviesLocal(movies));
        });
    };
};
  