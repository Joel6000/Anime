import React from 'react';
import Home from '../components/Home';
import BottomNavigator from './BottomNavigator';
import Favourites from "../components/Favourites";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './MainRoute';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Home" component={MainRoute} />
                <Drawer.Screen name="Anime List" component={BottomNavigator} />
                <Drawer.Screen name='Favourites' component={Favourites} options={{ headerShown: true, headerTitle: '' }} />
            </Drawer.Navigator>
        </NavigationContainer>

    );
};

export default DrawerNavigator;