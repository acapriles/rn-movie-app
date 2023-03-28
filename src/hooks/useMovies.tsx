import { useEffect, useState } from 'react';

import movieDB from '../api/movieDB';
import { MovieDBMoviesResponde, Movie } from '../interfaces/movieInterface';


//? MULTIPLE REQUEST AUTOMATICALLY

interface MovieState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    
    // const [moviesInTheater, setMoviesInTheater] = useState<Movie[]>([]);
    // const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    const [moviesState, setMoviesState] = useState<MovieState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    });
    
    const getMovies = async () => {
        try {
            setIsLoading( true );
            
            // const respNowPlayin = await movieDB.get<MovieDBMoviesResponde>('/now_playing');
            // const respPopular = await movieDB.get<MovieDBMoviesResponde>('/popular');
            
            // setMoviesInTheater( respNowPlayin.data.results );
            // setPopularMovies( respPopular.data.results );


            const nowPlayingPromise = movieDB.get<MovieDBMoviesResponde>('/now_playing');
            const popularPromise    = movieDB.get<MovieDBMoviesResponde>('/popular');
            const topRatedPromise   = movieDB.get<MovieDBMoviesResponde>('/top_rated');
            const upcomingPromise   = movieDB.get<MovieDBMoviesResponde>('/upcoming');

            const responses = await Promise.all([
                nowPlayingPromise,
                popularPromise,
                topRatedPromise,
                upcomingPromise
            ]);

            setMoviesState({
                nowPlaying: responses[0].data.results,
                popular: responses[1].data.results,
                topRated: responses[2].data.results,
                upcoming: responses[3].data.results,
            })

            setIsLoading( false );
        } catch (error) {
            
        }
    }

    useEffect(() => {
        // now_playing
        getMovies();
    }, []);

    return {
        isLoading,
        // moviesInTheater,
        // popularMovies,
        ...moviesState,
    }
}
