/**
 * Created by kurosaki on 2018/9/4.
 */
import {
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Text,
    AsyncStorage,
    StatusBar
} from 'react-native';


export default class HttpUtils {

    //基于 fetch 封装的 GET请求
    static get(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("token",(error,result)=> {
                fetch(url,{
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'token':result?result:""
                    }
                }).then((response) => {
                    return response.json();
                }).then((result) => {
                    return resolve(result)
                }).catch((error) => {
                    return reject(error)
                })
            })
    })
    }



    //基于 fetch 封装的 POST请求
    static post(url, data) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("token",(error,result)=>{
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'token':result?result:""
                    },
                    body: data?JSON.stringify(data):JSON.stringify({})
                }).then((response) => {
                    return response.json();
                }).then((result) => {
                    return resolve(result)
                }).catch((error) => {
                    return  reject(error)
                })
            })
        })
    }
    //基于 fetch 封装的 POST请求
    static postFormData(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: data
            }).then((response) => {
                return response.json();
            }).then((result) => {
                return resolve(result)
            }).catch((error) => {
                return  reject(error)
            })
        })
    }
    //基于 fetch 封装的 POST请求
    static postUpload(url, data) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("token",(error,result)=>{
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'token':result?result:""
                    },
                    body: data
                }).then((response) => {
                    return response.json();
                }).then((result) => {
                    return resolve(result)
                }).catch((error) => {
                    return  reject(error)
                })
            })
        })
    }





}

