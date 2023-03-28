import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/Navigation';


interface Props {
    movie: Movie;
    width?: number;
    height?: number;
}

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParams, 'DetailScreen'>;

export const MoviePoster = ( { movie, width = 300, height = 400 }: Props ) => {

    const navigation = useNavigation<DetailsScreenNavigationProp>();

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
    
    return (
        <TouchableOpacity
            onPress={ () => navigation.navigate('DetailScreen', movie) }
            activeOpacity={ 0.9 }
            style={{ 
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7,
            }}
        >
            <View
                style={ styles.imageContainer }
            >
                <Image
                    source={{ uri }}
                    style={ styles.image }
                />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
        
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10,
    },
});
