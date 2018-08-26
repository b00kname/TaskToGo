import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from './Firebase';

const rootRef = firebase.database().ref();
const taskRef = rootRef.child('tasks');

export default class DisplayScreen extends Component {

    componentWillMount() {
        const tasks = [];
        taskRef.on('value', (x) => {
            x.forEach((y) => {
                tasks.push({
                    key: y.key,
                    taskName: y.toJSON().taskName
                });
            })
        })
    }

    render() {
        return (
            <View>
                <Text>Welcome to homescreen</Text>

            </View>
        );
    }
}