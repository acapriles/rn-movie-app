import axios from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '617e20588e827103a7e88db4fc17e36c',
        language: 'es-ES',
    }
});

export default movieDB;