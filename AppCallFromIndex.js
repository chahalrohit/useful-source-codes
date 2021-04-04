import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Permission, { PERMISSION_TYPE } from './AppPermission';

export default class App extends Component {
    // componentDidMount() {
    //     Permission.checkPermission(PERMISSION_TYPE.photo)
    // }

    // componentDidMount() {
    //     Permission.requestMultiple([
    //         PERMISSION_TYPE.microphone,
    //         PERMISSION_TYPE.photo,
    //         PERMISSION_TYPE.send_sms,
    //     ]);
    // }

    // componentDidMount(){
    //     Permission.requestNotifyPermission()
    // }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>React Native Permission</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
