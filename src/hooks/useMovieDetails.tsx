import { useState, useEffect } from 'react';

import movieDB from "../api/movieDB";
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}


//? MULTIPLE REQUEST AUTOMATICALLY
interface MovieState {
    nowPlaying: MovieFull[];
    popular: CreditsResponse[];
}


export const useMovieDetails = ( movieId: number ) => {
    
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async () => {
        try {

            const movieDetailsPromise = movieDB.get<MovieFull>(`/${ movieId }`);
            const castPromise         = movieDB.get<CreditsResponse>(`${ movieId }/credits`);

            const [ movieDetailsResp, castResp ] = await Promise.all([
                movieDetailsPromise,
                castPromise,
            ]);

            setState({
                isLoading: false,
                movieFull: movieDetailsResp.data,
                cast: castResp.data.cast,
            })
            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [])
    
    
    return {
        // Properties
        ...state,
    }
}
