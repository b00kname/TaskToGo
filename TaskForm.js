import React, { Component } from 'react';
import { View, Text, TextInput, DatePickerAndroid, TimePickerAndroid, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firebase from './Firebase';

const rootRef = firebase.database().ref();
const taskRef = rootRef.child('tasks');

Date.prototype.formatted = function () {
    let date = this.getDate();
    let day = this.getDay();
    let month = this.getMonth();
    let year = this.getFullYear();
    let daysText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthsText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //return '${daysText[day]}, ${monthsText[month]} ${date}, ${year}';
    return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
}

export default class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: '',
            details: '',

            date: new Date(),
            dateText: '',

            hour: null,
            minute: null,
            timeText: '',

            tasks: [],
            newTask: '',
            newDetails: ''
        }
    }

    openDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: this.state.date,
                minDate: new Date(2000, 0, 1),
                maxDate: new Date(2099, 11, 31),
                mode: 'calendar'
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                let selectedDate = new Date(year, month, day);
                this.setState({
                    date: selectedDate,
                    dateText: selectedDate.formatted()
                });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open Date Picker', message);
        }
    }

    openTimePicker = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: this.state.hour,
                minute: this.state.minute,
                is24Hour: false
            });

            //var timeType;

            if (action !== TimePickerAndroid.dismissedAction) {
                /*if (hour < 12)
                    timeType = 'AM'
                else
                    timeType = 'PM'
                */
                this.setState({
                    hour: hour,
                    minute: minute,
                    //timeType: timeType,
                    timeText: `${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}`
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open Time Picker', message);
        }
    }

    onPressAdd = () => {
        taskRef.push({
            newTask: this.state.newTask,
            newDetails: this.state.newDetails,
            newDate: this.state.dateText,
            newTime: this.state.timeText
        })
        //this.props.navigation.navigate('DisplayScreen')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add Task</Text>

                <TextInput style={styles.inputBox}
                    placeholder='Task'
                    placeholderTextColor='#ffffff'
                    onChangeText={(x) => this.setState({ newTask: x })} />

                <TextInput style={styles.inputBox}
                    placeholder='Details'
                    placeholderTextColor='#ffffff'
                    onChangeText={(x) => this.setState({ newDetails: x })} />

                <TouchableOpacity
                    onPress={this.openDatePicker}>
                    <TextInput style={styles.inputBox}
                        placeholder='Date'
                        placeholderTextColor='#ffffff'
                        value={this.state.dateText}
                        editable={false} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.openTimePicker}>
                    <TextInput style={styles.inputBox}
                        placeholder='Time'
                        placeholderTextColor='#ffffff'
                        value={this.state.timeText}
                        editable={false} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={this.onPressAdd}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#37474f'
    },

    title: {
        fontSize: 30,
        fontWeight: '500',
        color: '#ffffff',
        marginVertical: 30
    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 18,
        color: '#ffffff',
        fontSize: 18,
        marginVertical: 10
    },

    button: {
        width: 300,
        backgroundColor: '#d50000',
        borderRadius: 25,
        marginVertical: 30,
        paddingVertical: 12
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'

    }
})