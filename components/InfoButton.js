'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import styles from '../styles.js';

export default class InfoButton extends Component {
    render() {
        return (
            <View style={styles.info}>
                <TouchableHighlight
                    underlayColor={'#4885ed'}
                    onPress={this.props.onPress}>
                    <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
