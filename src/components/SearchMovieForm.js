import React from 'react';
import moment from 'moment';
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
            error: ''
        };
    }
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }), async () => {
            const data = await omdbAPIList(this.state.title);
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
                        <div>
                            <button className="button">Search Movie</button>
                        </div>
                    </form>
                </div>
                <div className="content-container">
                    Wyszukane filmy?
                </div>
            </div>

        );
    }
}