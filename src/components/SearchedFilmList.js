import React from 'react';
import FilmTab from './FilmTab';

class SearchedFilmList extends React.Component {
    constructor(props) {
        super();

    }

    render() {
        return (
            <div className='content-container'>
                {
                    (this.props.movies.Response && this.props.movies.Response === 'True') ? this.props.movies.Search.map((element, index) => {
                        console.log(element);
                        return (
                            <div key={element.imdbID}>
                                <FilmTab data={element} />
                            </div>
                        );
                    }) : 'Movies not found.'
                }
            </div>
        );
    }
};

export default SearchedFilmList;