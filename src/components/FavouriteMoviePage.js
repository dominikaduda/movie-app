import React from 'react';
import FavouriteFilmList from './FavouriteFilmList';
import { omdbAPIFilmByImdbID, omdbAPIList } from '../utils/omdbAPI';
import database from '../firebase/firebase';
import * as firebase from 'firebase';

export default class FavouriteMoviePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title || '',
            favouriteFilms: [],
            isLoading: true,
            error: ''
        };
    }

    async componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        const favouriteFilmsTmp = [];
        database.ref(`users/${uid}/movies`).orderByChild('favourite').equalTo("yes").once('value').then((snapshot) => {
            if (snapshot.exists()){

                snapshot.forEach((childSnapshot) => {
                    favouriteFilmsTmp.push({
                        imdbID: childSnapshot.val().imdbID
                    })
                });

                let dataF = [];
                let counter = 0;
                favouriteFilmsTmp.forEach( async (item, index, array) => {
                    const data =  await omdbAPIFilmByImdbID(item.imdbID)
                    dataF.push(data);

                    if(counter === array.length - 1) {
                        this.setState(() => ({
                            favouriteFilms: dataF,
                            isLoading: false
                        }));
                    }
                    counter++;
                });
            }
        });
    }

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Favourite Movies</h1>
                </div>
                {!this.state.isLoading &&
                <FavouriteFilmList movies={this.state.favouriteFilms} />}
            </div>

        );
    }
}