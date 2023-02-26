import { View, Text, FlatList, Image, ScrollView, SafeAreaView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';
import SearchBox from './SearchBox';
import PageScroll from './PageScroll';
import AnimeList from './AnimeList';
import Icon from 'react-native-vector-icons/Ionicons';

const ScreenView = ({ anime, setKeyword, setPage, page, keyword }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexGrow: 1, marginHorizontal: 5, justifyContent: 'center' }}>

                <SearchBox setKeyword={setKeyword} keyword={keyword} setPage={setPage} />

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>List of Animes</Text>
                    {
                        anime.status !== 'success' ?
                            <View style={{ flex: 1 }}><Text>Loading</Text></View>
                            :
                            <FlatList
                                data={anime?.data?.data?.data}
                                contentContainerStyle={{ flexGrow: 1, alignContent: 'center' }}
                                keyExtractor={(item, index) => index}
                                scrollEnabled={true}
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
                    }
                </View>
            </View>

            {
                anime.data?.data?.pagination?.has_next_page ?
                    <PageScroll anime={anime} page={page} setPage={setPage} />
                    :
                    null
            }

        </SafeAreaView >
    );
};

export default ScreenView;