import Airing from "../components/Airing";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from "./BottomNavigator";
import Home from "../components/Home";
import DrawerNavigator from "./DrawerNavigator";
import DetailView from "../components/DetailView";
import Favourites from "../components/Favourites";

const Stack = createStackNavigator();

const MainRoute = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name='Favourites' component={Favourites} options={{ headerShown: true, headerTitle: '' }} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="Bottom" component={BottomNavigator} />
            <Stack.Screen name="Airing" component={Airing} />
            <Stack.Screen name="Complete" component={Airing} />
            <Stack.Screen name="Upcoming" component={Airing} />
            <Stack.Screen name='DetailView' component={DetailView} options={{ headerShown: true, headerTitle: '' }} />
        </Stack.Navigator>
    );
};

export default MainRoute;