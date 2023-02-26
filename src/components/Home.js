import { View, Text, FlatList, Image, ScrollView, SafeAreaView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueries } from 'react-query';
import PageScroll from './PageScroll';
import AnimeList from './AnimeList';
import SearchBox from './SearchBox';
// import GetApiCall from '../api/ApiCall';
import { DataContext } from '../provider/Context';

const Home = ({ navigation }) => {
    const { page, setPage, keyword, setKeyword, status, setStatus } = useContext(DataContext);

    const GetApiCall = async (url) => {
        const resp = await axios(url);
        return resp;
    };


    const searchAnime = useQuery(['searchAnime', page, keyword], () => GetApiCall(`https://api.jikan.moe/v4/anime?page=${page}&letter=${keyword}&limit=25`), { keepPreviousData: true });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexGrow: 1, marginHorizontal: 5, justifyContent: 'center' }}>
                <SearchBox setKeyword={setKeyword} keyword={keyword} setPage={setPage} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Anime</Text>
                    {
                        searchAnime?.status !== 'success' ?
                            <View style={{ flex: 1 }}><Text>Loading</Text></View>
                            :
                            <FlatList
                                data={searchAnime?.data?.data?.data}
                                contentContainerStyle={{ flexGrow: 1, alignContent: 'center' }}
                                keyExtractor={(item, index) => index}
                                scrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View>
                                        <Text>Loading</Text>
                                    </View>
                                )}
                                renderItem={({ item, index }) => (
                                    <AnimeList item={item} />
                                )}
                            />
                    }
                </View>
            </View>

            {
                searchAnime.data?.data?.pagination?.has_next_page ?
                    <PageScroll anime={searchAnime} page={page} setPage={setPage} />
                    :
                    null
            }

        </SafeAreaView >

    );
};

export default Home;