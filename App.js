import React, { Component }  from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, TouchableHighlight, AlertIOS, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import ActionButton from './components/ActionButton';
import ListItem from './components/ListItem';
import StatusBar from './components/StatusBar';
import styles from './styles.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDBDS9c5M2X74MW3rAfjOMYNlZvkClLjlY",
    authDomain: "sample-app-d0c8e.firebaseapp.com",
    databaseURL: "https://sample-app-d0c8e.firebaseio.com",
    projectId: "sample-app-d0c8e",
    storageBucket: "sample-app-d0c8e.appspot.com",
    messagingSenderId: "328006132404"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('items');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>

                    <StatusBar title="Grocery List" />

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderItem.bind(this)}
                        enableEmptySections={true}
                        style={styles.listview} />

                    <ActionButton onPress={this._addItem.bind(this)} title="Add" />

                </View>
            </SafeAreaView>
        )
    }

    _addItem() {
        AlertIOS.prompt(
            'Add New Item',
            null,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Add',
                    onPress: (text) => {
                        this.itemsRef.push({ title: text })
                    }
                },
            ],
            'plain-text'
        );
    }

    _renderItem(item) {

        const onPress = () => {
            AlertIOS.alert(
                'Complete',
                null,
                [
                    { text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
                    { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
                ]
            );
        };

        return (
            <ListItem item={item} onPress={onPress} />
        );
    }
}
