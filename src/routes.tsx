import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen
                    name="SignUp"
                    component={SignUp}
                />
                <Screen
                    name="Profile"
                    component={Profile}
                />
                <Screen
                    name="Pokedex"
                    component={Pokedex}
                />
                <Screen
                    name="Pokemon"
                    component={Pokemon}
                />
            </Navigator>
        </NavigationContainer>
    );
}
