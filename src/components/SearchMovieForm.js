import React from 'react';
import SearchedFilmList from './SearchedFilmList';
import { omdbAPIList } from '../utils/omdbAPI';


export default class SearchMovieForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title || '',
            searchedFilms: [],
            error: ''
        };
    }
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }), async () => {
            const searchedFilms = await omdbAPIList(this.state.title);
            this.setState(() => ({
                searchedFilms: searchedFilms
            }));
        });
    };

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Search for Movie</h1>
                </div>
                <div className="content-container">
                    <form className="form">
                        {this.state.error && <p className="form__error">{this.state.error}</p>}
                        <input
                            type="text"
                            placeholder="Type title to search..."
                            autoFocus
                            className="text-input"
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                    </form>
                </div>
                <SearchedFilmList movies={this.state.searchedFilms} />
            </div>

        );
    }
}