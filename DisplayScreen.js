import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/database'

var config = {
    apiKey: "AIzaSyDG4GzUOBrpt9dr3VdiUZSpr5TY9dzm7N4",
    authDomain: "tasktogoo.firebaseapp.com",
    databaseURL: "https://tasktogoo.firebaseio.com",
    projectId: "tasktogoo",
    storageBucket: "tasktogoo.appspot.com",
    messagingSenderId: "682989888050"
};
firebase.initializeApp(config);

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