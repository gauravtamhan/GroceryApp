import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { auth, database, provider } from '../firebase.js';

export default class Loading extends React.Component {
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Home' : 'Auth')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})