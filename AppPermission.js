import React, { Component } from 'react';
import {View,Text,Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS, requestNotifications} from 'react-native-permissions';

const PLATFORM_MICROPHONE_PERMISSIONS = {
    ios:PERMISSIONS.IOS.MICROPHONE,
    android:PERMISSIONS.ANDROID.RECORD_AUDIO,
}

const PLATFORM_PHOTO_PERMISSIONS = {
    ios:PERMISSIONS.IOS.PHOTO_LIBRARY,
    android:PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
}

const PLATFORM_SEND_SMS_PERMISSIONS = {
    ios:null,
    android:PERMISSIONS.ANDROID.SEND_SMS
}

const REQUEST_PERMISSION_TYPE = {
    microphone:PLATFORM_MICROPHONE_PERMISSIONS,
    photo:PLATFORM_PHOTO_PERMISSIONS,
    send_sms:PLATFORM_SEND_SMS_PERMISSIONS
}

export const PERMISSION_TYPE = {
    microphone:'microphone',
    photo:'photo',
    send_sms:'send_sms'
} 

class AppPermission extends Component{
    
    checkPermission = async (type):Promise<boolean>=>{
        console.log("App Permission checkPermission type : ",type)
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        console.log("AppPermission checkPermission permissions : ",permissions)
        if(!permissions){
            return true
        }
        try {
            const result = await check(permissions)
            console.log("AppPermission checkPermission result : ",result)
            if(result === RESULTS.GRANTED){
                return true
            }
            return this.requestPermission(permissions)  //request permission
        } catch (error) {
            console.log("AppPermission checkPermission error : ",error)
            return false
        }
    }

    requestPermission = async (permissions) : Promise<boolean> =>{
        console.log("AppPermission requestPermissoin permissions : ",permissions)
        try {
            const result = await request(permissions)
            console.log("AppPermission requestPermission result : ",result)
            return result  === RESULTS.GRANTED
        } catch (error) {
            console.log("AppPermission requestPermission error : ",error)
            return false
        }
    }

    requestMultiple = async (types):Promise<boolean>=>{
        console.log("AppPermission requestMultiple types : ",types)
        const results = []
        for(const type of types){
            const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS]
            if(permission){
                const result = await this.requestPermission(permission)
                results.push(result)
            }
        }
        for(const result of results){
            if(!result){
                return false
            }
        }
        return true
    }

    requestNotifyPermission = async():Promise<boolean>=>{
        if(Platform.OS === 'android'){
            return true
        }
        const {status,settings} = await requestNotifications(['alert','sound','badge'])
        console.log("AppPermission requestNotifyPermission status settings : ",status,settings)
        return status === RESULTS.GRANTED
    }
}

const Permission = new AppPermission();
export default Permission;