const request = require('request')

const omdbAPI = (title, callback) => {
    const url = 'https://www.omdbapi.com/?t=' + encodeURIComponent(title) + '&apikey=' + process.env.OMDB_API_KEY

    request({ url, json: true }, (error, response ) => {
        if (error) {
            callback('Unable to connect to movie services!', undefined)
        } else if (response.body.Error) {
            callback('Unable to find movie. Try again with different search term', undefined)
        } else {
            callback(undefined, {
                Title: response.body.Title,
                Year: response.body.Year,
                Genre: response.body.Genre,
                imdbID: response.body.imdbID,
                poster: response.body.poster
            })
        }
    })
}

module.exports = omdbAPI