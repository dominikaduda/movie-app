import React from 'react';
import SerchedFilmList from './SerchedFilmList';
import { omdbAPIList } from '../utils/omdbAPI';


export default class SearchMovieForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            title: props.title || '',
            year: '',
            imdbID: '',
            type: '',
            poster: '',
            serchedFilms: [],
            error: ''
        };
    }
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }), async () => {
            const serchedFilms = await omdbAPIList(this.state.title);
            console.log(serchedFilms);
            this.setState(() => ({
                serchedFilms
            }));
        });
    };
    onTitleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.title) {
            this.setState(() => ({ error: 'Please provide title.' }));
        } else {
            this.setState(() => ({ error: '' }));
            //wyszukanie info z omdbAPI
        }
    };

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.serchedFilms !== this.state.serchedFilms) {
    //         console.log('something prop has changed.', this.state.serchedFilms);
    //     }
    // }

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Search for Movie</h1>
                </div>
                <div className="content-container">
                    <form className="form" onSubmit={this.onTitleSubmit}>
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
                <div className="content-container">
                    Movies found:
                </div>
                <SerchedFilmList movies={this.state.serchedFilms} />
            </div>

        );
    }
}