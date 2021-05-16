import React from 'react';

class FilmTab extends React.Component {
    constructor(props) {
        super();
        const defaultImageUrl = '/images/default.png';
    }

    tranferToFilm = () => {
        window.location.href = `/movie/${this.props.data.imdbID}`;
    };

    render() {
        return (
            <div className='search-container' onClick={this.tranferToFilm}>
                <div className={this.props.data.Poster !== 'N/A' ? 'tab-image' : 'tab-image -defalut'} style={{ backgroundImage: `url(${this.props.data.Poster})` }}></div>
                <div className='tab-content'>
                    <p className='tab-title'>{this.props.data.Title} ({this.props.data.Year})</p>
                </div>
            </div>
        );
    }
}

export default FilmTab;