import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-new-snap-carousel';

import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    // const { moviesInTheater, popularMovies, isLoading } = useMovies();
    const { isLoading, nowPlaying, popular, topRated, upcoming } = useMovies();
    const { top } = useSafeAreaInsets();

    if ( isLoading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="red" size={ 100 } />
            </View>
        )
    }
    

    return (
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
                    />
                </View>

                {/* Popular Movies */}
                <HorizontalSlider title='Popular Movies' movies={ popular } />
                <HorizontalSlider title='Top Rated' movies={ topRated } />
                <HorizontalSlider title='Upcoming' movies={ upcoming } />

            </View>
        </ScrollView>
    )
}
