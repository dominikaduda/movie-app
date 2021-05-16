import React from 'react';
import FilmTab from './FilmTab';

class SerchedFilmList extends React.Component {
    constructor(props) {
        super();

        console.log(props);
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.movies !== this.props.movies) {
    //         console.log('something prop has changed.', this.props.movies);
    //     }
    // }
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
                    }) : ''
                }
            </div>
        );
    }
};

export default SerchedFilmList;