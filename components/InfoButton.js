'use strict';

import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styles from '../styles.js';

export default class InfoButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={[styles.button, { backgroundColor: '#4885ED'}]}
                underlayColor={'#3B78E0'}
                onPress={this.props.onPress}>
                <Text style={styles.actionText}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }
}
