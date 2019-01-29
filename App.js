import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Auth from './views/Auth';
import Home from './views/Home';
import Loading from './views/Loading';

const Navigator = createAppContainer(createSwitchNavigator(
    {
        Loading,
        Auth,
        Home
    },
    {
        initialRouteName: 'Loading'
    }
))

export default class App extends Component {
    
    render() {
        return (
            <Navigator />
        )
    }

}