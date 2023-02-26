import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Airing from "../components/Airing";
import { View, Text } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { DataContext } from "../provider/Context";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabBar = ({ state, descriptors, navigation }) => {

    const { page, setPage, keyword, setKeyword, status, setStatus } = useContext(DataContext);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {
                state.routes.map((item, index) => {
                    const { options } = descriptors[item.key];

                    const isFocused = state.index === index;

                    let status = item.name.toLowerCase();

                    return (
                        <View key={item.key} style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ alignItems: 'center', marginVertical: 3 }}
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                onPress={() => {
                                    setPage(1);
                                    setKeyword('');
                                    setStatus(status);
                                    navigation.navigate(item.name, { title: item.name });
                                }}>
                                <Text>
                                    <Icon name={isFocused ? 'square' : 'square-outline'} size={30} color='#333' />
                                </Text>
                                <Text>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
        </View>
    );
};


const BottomNavigator = () => {
    return (
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Airing" component={Airing} options={{ headerShown: false }} />
            <Tab.Screen name="Complete" component={Airing} options={{ headerShown: false }} />
            <Tab.Screen name="Upcoming" component={Airing} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default BottomNavigator;