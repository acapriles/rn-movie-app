import { Text, View, FlatList } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';


interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}
export const MovieDetails = ( { movieFull, cast }: Props ) => {
    return (
        <>
            {/* Details */}
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name="star-outline"
                        color="gray"
                        size={ 16 }
                    />

                    <Text> { movieFull.vote_average }</Text>
                    
                    <Text style={{ marginLeft: 5 }}>
                        - { movieFull.genres.map( ( gen ) => gen.name ).join(', ') }
                    </Text>
                </View>


                {/* History */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    History
                </Text>

                <Text style={{ fontSize: 16 }}>
                    { movieFull.overview }
                </Text>

                {/* Budget */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Budget
                </Text>

                <Text style={{ fontSize: 16 }}>
                    {
                        Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format( movieFull.budget )
                    }
                </Text>
            </View>


            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 100 }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Budget
                </Text>

                <FlatList
                    data={ cast }
                    keyExtractor={ ( item ) => item.id.toString() }
                    renderItem={ ({ item }) => <CastItem actor={ item } /> }
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    style={{ marginTop: 10, height: 70 }}
                />
            </View>


        </>
    )
}
