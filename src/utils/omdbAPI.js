import axios from 'axios';
import { appConfig } from '../../config';

export const omdbAPIList = async (title) => {
    const url = 'https://www.omdbapi.com/?s=' + encodeURIComponent(title) + '&apikey=' + appConfig.OMDB_API_KEY;
    const response = await axios.get(url);
    return response.data;
};

export const omdbAPIFilm = async (title) => {
    const url = 'https://www.omdbapi.com/?t=' + encodeURIComponent(title) + '&apikey=' + appConfig.OMDB_API_KEY;
    const response = await axios.get(url);
    console.log(response);
    return response.data;
};