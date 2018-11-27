/**
 * Created by kurosaki on 2018/9/4.
 */

export default class HttpUtils {
    //基于 fetch 封装的 GET请求
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                return response.json();
            }).then((result) => {
                return resolve(result)
            }).catch((error) => {
                return reject(error)
            })
    })
    }
    //基于 fetch 封装的 POST请求
    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((response) => {
                return response.json();
            }).then((result) => {
                return resolve(result)
            }).catch((error) => {
                return  reject(error)
            })
    })
    }
}

