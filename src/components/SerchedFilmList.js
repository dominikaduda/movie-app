import React from 'react';

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
            <div>
                {
                    (this.props.movies.Response && this.props.movies.Response === 'True') ? this.props.movies.Search.map((element, index) => {
                        return (
                            <div key={index}>
                                <p>SerchedFilmList</p>
                            </div>
                        );
                    }) : ''
                }
            </div>
        );
    }
};

export default SerchedFilmList;