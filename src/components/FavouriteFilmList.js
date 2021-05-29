import React from 'react';
import FilmTab from './FilmTab';

class FavouriteFilmList extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className='content-container'>
                {
                    this.props.movies.map(element => {
                        return (<div key={element.imdbID}>
                            <FilmTab data={element} />
                        </div>)
                    })
                }
            </div>
        );
    }
};

export default FavouriteFilmList;