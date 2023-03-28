import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';


const { height: screenHight } = Dimensions.get('screen');

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const { isLoading, movieFull, cast } = useMovieDetails( movie.id );

    return (
        <ScrollView>
            <View style={ styles.imageContainer }>
                <View style={ styles.imageBorder }>
                    <Image
                        source={{ uri }}
                        style={ styles.posterImage }
                    />
                </View>
            </View>

            <View style={ styles.marginContainer }>
                <Text style={ styles.subTitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>

            </View>


            {
                ( isLoading )
                    ? <ActivityIndicator  color="gray" size={35} style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={ movieFull! } cast={ cast } />
            }

            {/* Back Button */}
            <TouchableOpacity
                onPress={ () => navigation.pop() }
                style={ styles.backButton }
            >
                <Icon 
                    name='arrow-back-outline'
                    color="white"
                    size={ 50 }
                />
            </TouchableOpacity>
                

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        // overflow: 'hidden',
        width: '100%',
        height: screenHight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
    },
    posterImage: {
        flex: 1,
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5,
    }
});