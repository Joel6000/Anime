import { View, Text } from 'react-native';
import React from 'react';
import MainRoute from './MainRoute';
import DataContextProvider from '../provider/Context';
import DrawerNavigator from './DrawerNavigator';

const Main = () => {
    return (
        <DataContextProvider>
            <DrawerNavigator />
        </DataContextProvider>
    );
};

export default Main;