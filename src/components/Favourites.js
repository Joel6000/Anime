import { View, Text, FlatList, Image, ScrollView, SafeAreaView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavour, removeFavour } from '../redux/Action';
import AnimeList from './AnimeList';
import Icon from 'react-native-vector-icons/Ionicons';

const Favourites = ({ navigation }) => {

    const { anime } = useSelector(state => state.favReducer);
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 5, justifyContent: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Favourites</Text>
                            <Icon name='heart' size={30} color='red' />
                        </View>
                        <FlatList
                            data={anime}
                            contentContainerStyle={{ flexGrow: 1, alignContent: 'center' }}
                            keyExtractor={(item, index) => index}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            scrollsToTop={true}
                            ListEmptyComponent={() => (
                                <View>
                                    <Text>Loading / There is no data..</Text>
                                </View>
                            )}
                            renderItem={({ item, index }) => (
                                <AnimeList item={item} />
                            )}
                        />

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

export default Favourites;