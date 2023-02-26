import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SearchBox = ({ keyword, setKeyword, setPage }) => {

    const navigation = useNavigation();

    return (
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() =>
                    navigation.toggleDrawer()
                }>
                <Icon name='menu' size={32} color="#333" />
            </TouchableOpacity>
            <TextInput
                style={{
                    flex: 4,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: 'black',
                    marginVertical: 5,
                    marginHorizontal: 5
                }}
                returnKeyType={'next'}
                placeholder='Please enter keyword'
                defaultValue={keyword}
                onSubmitEditing={({ nativeEvent }) => {
                    setKeyword(nativeEvent.text);
                    setPage(1);
                }}
            />
        </View>
    );
};

export default SearchBox;