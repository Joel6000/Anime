import { View, Text, FlatList, Image, ScrollView, SafeAreaView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';

const PageScroll = ({ anime, page, setPage }) => {
    return (
        <View style={{ height: 30, flexDirection: 'row', borderWidth: 1 }} >

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    anime?.data?.data?.pagination?.current_page == 1 || page == 1
                        ?
                        null
                        :
                        <TouchableOpacity
                            onPress={() => {
                                setPage(page - 1);
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Back</Text>
                            </View>
                        </TouchableOpacity>
                }
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderRightWidth: 1 }}>
                <Text>
                    Page:{anime?.data?.data?.pagination?.current_page ? anime?.data?.data?.pagination?.current_page : page}
                </Text>
            </View>


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                {
                    anime?.data?.data?.pagination?.has_next_page ?
                        <TouchableOpacity
                            onPress={() => {
                                setPage(page + 1);
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Next</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                }
            </View>

        </View>
    );
};

export default PageScroll;