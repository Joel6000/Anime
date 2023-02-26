import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const AnimeList = ({ item }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetailView', { id: item.mal_id });
            }}>
            <View style={{ flex: 1, borderWidth: 1, margin: 5, flexDirection: 'row' }}>

                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 5, borderRightWidth: 1 }}>
                    <Image
                        style={{ height: 150, width: 100, marginHorizontal: 5 }}
                        resizeMode={'contain'}
                        source={{ uri: item?.images.jpg.image_url }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 3 }}>
                                <Text style={{ flexWrap: 'wrap', fontSize: 16, padding: 0 }}>{item.title}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14 }}>Year: {item.year}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12 }}>Rating: {item.rating}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 25 }}>{item.score?.toFixed(2)}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
};

export default AnimeList;