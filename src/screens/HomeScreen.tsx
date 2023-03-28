import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-new-snap-carousel';
import ImageColors from 'react-native-image-colors'

import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { useContext, useEffect } from 'react';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    // const { moviesInTheater, popularMovies, isLoading } = useMovies();
    const { isLoading, nowPlaying, popular, topRated, upcoming } = useMovies();
    const { top } = useSafeAreaInsets();

    const { setMainColors } = useContext( GradientContext );

    const getPosterColors = async ( index: number ) => {
        const movie = nowPlaying[ index ];
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

        const [ primary = 'transparent', secondary = 'transparent' ] = await getImageColors( uri );

        setMainColors({ primary, secondary });
    }

    useEffect(() => {
        if ( nowPlaying.length > 0 ) {
            getPosterColors( 0 );
        }
    }, [ nowPlaying ]);
    

    if ( isLoading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="red" size={ 100 } />
            </View>
        )
    }
    

    return (
        <GradientBackground>
            <ScrollView
                showsVerticalScrollIndicator={ false }
            >
                <View style={{ marginTop: top + 20 }}>

                    {/* Main Corousel */}
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={ nowPlaying }
                            renderItem={ ({ item }: any ) => <MoviePoster movie={ item } /> }
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.9 }
                            onSnapToItem={ ( index: number ) => getPosterColors( index ) }
                        />
                    </View>

                    {/* Popular Movies */}
                    <HorizontalSlider title='Popular Movies' movies={ popular } />
                    <HorizontalSlider title='Top Rated' movies={ topRated } />
                    <HorizontalSlider title='Upcoming' movies={ upcoming } />

                </View>
            </ScrollView>
        </GradientBackground>
    )
}
