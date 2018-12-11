/**
 * Created by kurosaki on 2018/12/11.
 */
import { Linking, Platform } from 'react-native';
let MyUtil = {
    /**
     * 跳转到导航界面
     * @param lon
     * @param lat
     * @param name
     * @param targetAppName browser-浏览器打开， gaode-高德APP， baidu-百度APP，如果没有安装相应APP则使用浏览器打开。
     */
    turn2MapApp(lon = 0, lat = 0, targetAppName = 'baidu', name = '目标地址'){
        if (0 == lat && 0 == lon) {
            console.warn('暂时不能导航');
            return;
        }

        let url = '',urls="";//url 高德  urls 百度
        let webUrl = `http://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlGaode = `http://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlBaidu = `http://api.map.baidu.com/direction?destination=latlng:${lat},${lon}|name=${name}&mode=transit&coord_type=gcj02&output=html&src=mybaoxiu|wxy`;

        url = webUrl;
        urls = webUrl;
        if (Platform.OS == 'android') {//android
            url = `androidamap://route?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
            urls = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
            if (targetAppName == 'gaode') {
                webUrl = webUrlGaode;
            } else if (targetAppName == 'baidu') {
                webUrl = webUrlBaidu;
            }
        } else if (Platform.OS == 'ios') {//ios
            url = `iosamap://path?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
            urls = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
            if (targetAppName == 'gaode') {
                webUrl = webUrlGaode;
            } else if (targetAppName == 'baidu') {
                webUrl = webUrlBaidu;
            }

        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                return Linking.openURL(urls).then(support => {
                    if (!supported) {
                        return Linking.openURL(webUrl).catch(e => console.warn(e));
                    }else{
                        return Linking.openURL(url).catch(e => console.warn(e));
                    }
                }).catch(err => console.error('An error occurreds', err));
            } else {
                return Linking.openURL(url).catch(e => console.warn(e));
            }
        }).catch(err => console.error('An error occurred', err));



    },


};
export { MyUtil }
