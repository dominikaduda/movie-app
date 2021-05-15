import React from 'react';
import moment from 'moment';

export default class SearchMovieForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            year: '',
            imdbID: '',
            type: '',
            poster: '',
            error: ''
        };
    }
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    };
    onTitleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.title) {
            this.setState(() => ({ error: 'Please provide title.'}));
        } else {
            this.setState(() => ({ error: '' }));
            //wyszukanie info z omdbAPI
            this.props.onSubmit({
                title: this.state.title
            });
        }

        alert('Title ' + this.state.title + ' submitted!');
    };

    render() {
        return (
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
        )
    }
}