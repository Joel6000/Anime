import { View, Text, FlatList, Image, ScrollView, SafeAreaView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueries } from 'react-query';
import Icon from 'react-native-vector-icons/Ionicons';
import { DataContext } from '../provider/Context';
import { useSelector, useDispatch } from 'react-redux';
import { addFavour, removeFavour } from '../redux/Action';

const DetailView = ({ route, navigation }) => {
    const { page, setPage, keyword, setKeyword, status, setStatus } = useContext(DataContext);

    const { anime } = useSelector(state => state.favReducer);
    const dispatch = useDispatch();

    const [expand, setExpand] = useState(false);
    const [showEpi, setShowEpi] = useState(false);
    const [epiPage, setEpiPage] = useState(1);

    const { id } = route.params;

    const GetApiCall = async (url) => {
        const resp = await axios(url);
        return resp;
    };

    const detailAnime = useQuery(['detailAnime', id], () => GetApiCall(`https://api.jikan.moe/v4/anime/${id}/full`), { keepPreviousData: true });
    const animeEpisode = useQuery(['animeEpisode', id, epiPage], () => GetApiCall(`https://api.jikan.moe/v4/anime/${id}/episodes?page=${epiPage}`), { keepPreviousData: true });
    const recoAnime = useQuery(['animeEpisode', id], () => GetApiCall(`https://api.jikan.moe/v4/anime/${id}/recommendations`, { keepPreviousData: true }));

    if (detailAnime.status == 'loading' || animeEpisode.status == 'loading' || recoAnime.status == 'loading') {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 5 }}>
                    <View style={{ borderWidth: 1, flexDirection: 'row', marginVertical: 5 }}>
                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{ height: 180, width: 120, marginVertical: 5 }}
                                resizeMode={'contain'}
                                source={{ uri: detailAnime?.data?.data?.data?.images?.jpg.image_url }}
                            />
                        </View>
                        <View style={{ flex: 0.5, flexDirection: 'column' }}>
                            <Text style={{ flex: 1, fontSize: 20, fontStyle: 'italic', textAlignVertical: 'center' }}>{detailAnime?.data.data.data.title}</Text>
                            <Text style={{ flex: 1, fontSize: 20, fontStyle: 'italic', textAlignVertical: 'center' }}>Rating: {detailAnime?.data.data.data.rating}</Text>
                            <Text style={{ flex: 1, fontSize: 20, fontStyle: 'italic', textAlignVertical: 'center' }}>On Air: {detailAnime?.data.data.data.aired.string}</Text>
                            <Text style={{ flex: 1, fontSize: 20, fontStyle: 'italic', textAlignVertical: 'center' }}>Score:{detailAnime?.data.data.data.score}</Text>
                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (anime.some(obj => obj.mal_id === id)) {
                                        dispatch(removeFavour(detailAnime.data.data.data));
                                    } else {
                                        dispatch(addFavour(detailAnime.data.data.data));
                                    }
                                }}
                            >
                                {
                                    anime.some(obj => obj.mal_id === id) ?
                                        <Icon name='heart' size={30} color='red' />
                                        :
                                        <Icon name='heart-outline' size={30} color='red' />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1 }}>
                        <Text numberOfLines={expand ? 0 : 5}>Synopsis: {detailAnime?.data.data.data.synopsis}</Text>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() =>
                                setExpand(!expand)
                            }>
                            {
                                expand ?
                                    <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Show Less...</Text>
                                    :
                                    <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Show More...</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 1, marginVertical: 5 }}>
                        <View style={{ borderBottomWidth: 1, marginHorizontal: 5 }}>
                            <Text>Episode:</Text>
                        </View>
                        <FlatList
                            data={animeEpisode?.data?.data?.data}
                            contentContainerStyle={{ flex: 1, marginHorizontal: 10 }}
                            keyExtractor={(item, index) => index}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            numColumns={4}
                            columnWrapperStyle={{ justifyContent: 'flex-start' }}
                            ListEmptyComponent={() => (
                                <View>
                                    <Text>Loading / There is no data..</Text>
                                </View>
                            )}
                            renderItem={({ item, index }) => (
                                <>
                                    {
                                        (!showEpi && index < 12) ?
                                            <View style={{ width: '22%', borderWidth: 0.5, margin: 5, alignItems: 'center' }}>
                                                <Text style={{ fontSize: 9, margin: 5 }}>Episode: {item.mal_id}</Text>
                                            </View>
                                            :
                                            <>
                                                {
                                                    showEpi ?
                                                        <View style={{ width: '22%', borderWidth: 0.5, margin: 5, alignItems: 'center' }}>
                                                            <Text style={{ fontSize: 9, margin: 5 }}>Episode: {item.mal_id}</Text>
                                                        </View>
                                                        :
                                                        null
                                                }
                                            </>
                                    }
                                </>
                            )}
                            ListFooterComponent={() => (
                                <>
                                    {
                                        showEpi ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1, alignItems: 'center' }}>
                                                    {
                                                        animeEpisode?.data.data.pagination.last_visible_page == 1
                                                            ?
                                                            animeEpisode?.data.data.data.length == 0 ?
                                                                epiPage == 1
                                                                    ?
                                                                    null
                                                                    :
                                                                    <TouchableOpacity
                                                                        style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1 }}
                                                                        onPress={() => {
                                                                            if (epiPage > 1) {
                                                                                setEpiPage(epiPage - 1);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Text>
                                                                            Back
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                :
                                                                null
                                                            :
                                                            <TouchableOpacity
                                                                style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1 }}
                                                                onPress={() => {
                                                                    setEpiPage(epiPage - 1);
                                                                }}
                                                            >
                                                                <Text>
                                                                    Back
                                                                </Text>
                                                            </TouchableOpacity>
                                                    }
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center' }}>
                                                    {
                                                        animeEpisode?.data.data.pagination.last_visible_page ?
                                                            <Text style={{ borderBottomWidth: 1 }}>
                                                                Page: {epiPage}
                                                            </Text>
                                                            :
                                                            null
                                                    }
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center' }}>
                                                    {
                                                        animeEpisode?.data.data.pagination.has_next_page ?
                                                            <TouchableOpacity
                                                                style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1 }}
                                                                onPress={() => {
                                                                    setEpiPage(epiPage + 1);
                                                                }}>
                                                                <Text style={{ flex: 1 }}>Next</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            null
                                                    }
                                                </View>
                                            </View>
                                            :
                                            null
                                    }
                                    <TouchableOpacity
                                        style={{ flex: 1, alignItems: 'center' }}
                                        onPress={() => {
                                            setShowEpi(!showEpi);
                                        }}>
                                        {
                                            showEpi ?
                                                <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Show Less...</Text>
                                                :
                                                <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Show More...</Text>
                                        }
                                    </TouchableOpacity>
                                </>
                            )}
                        />
                    </View>
                    <View style={{ borderWidth: 1, marginVertical: 5 }}>
                        <View style={{ borderBottomWidth: 1, marginHorizontal: 5 }}>
                            <Text>Recommendations</Text>
                        </View>
                        <FlatList
                            data={recoAnime?.data?.data?.data}
                            contentContainerStyle={{ flex: 1, marginHorizontal: 10 }}
                            keyExtractor={(item, index) => index}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            initialNumToRender={12}
                            columnWrapperStyle={{ justifyContent: 'flex-start' }}
                            ListEmptyComponent={() => (
                                <View>
                                    <Text>Loading / There is no data..</Text>
                                </View>
                            )}
                            renderItem={({ item, index }) => (
                                <>
                                    {
                                        index < 12 ?
                                            <TouchableOpacity
                                                style={{ flex: 1, borderWidth: 1, margin: 5 }}
                                                onPress={() =>
                                                    navigation.navigate('DetailView', { id: item?.entry.mal_id })
                                                }>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 5, borderBottomWidth: 1 }}>
                                                    <Image
                                                        style={{ height: 120, width: 80 }}
                                                        resizeMode={'contain'}
                                                        source={{ uri: item?.entry.images.jpg.image_url }}
                                                    />
                                                </View>
                                                <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                                                    <Text style={{ fontStyle: 'italic' }}>{item.entry.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                </>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default DetailView;;