/**
 * Created by kurosaki on 2018/9/3.
 */
import React from 'react';
import { createBottomTabNavigator,createStackNavigator,createDrawerNavigator,createAppContainer } from 'react-navigation';
import { Login,Reg,HomePage,News,PerCenter,School,Service,PhoneList,Cost,CostExplain,CostSure,Map } from '../container'
import { Header } from 'native-base'
import {
    Image,
    StyleSheet,
    Animated,
    Dimensions,
    Easing
} from 'react-native';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

let {height,width} =  Dimensions.get('window');

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    icons:{
        width: 20,
        height: 22,
    },
    iconc:{
        width: 24,
        height: 20,
    },
    iconcs:{
        width: 27,
        height: 20,
    },

});



const TabNav = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions:({navigation})=>({
                tabBarLabel:"党建",
                tabBarIcon:({tintColor,focused})=>{
                    return(
                        focused?
                            <Image style={styles.icon} source={require("../assets/images/home1.png")}>
                            </Image>
                            :
                            <Image style={styles.icon} source={require("../assets/images/home0.png")}>
                            </Image>
                    )
                }
            })
        },
        News: {
            screen: News,
            navigationOptions:({navigation})=>({
                tabBarLabel:"新闻",
                tabBarIcon:({tintColor,focused})=>{
                    return(
                        focused?
                            <Image style={styles.icons} source={require("../assets/images/news1.png")}>
                            </Image>
                            :
                            <Image style={styles.icons} source={require("../assets/images/news0.png")}>
                            </Image>
                    )
                }
            })
        },
        Service: {
            screen: Service,
            navigationOptions:({navigation})=>({
                tabBarLabel:"服务",
                tabBarIcon:({tintColor,focused})=>{
                    return(
                        focused?
                            <Image style={styles.iconcs} source={require("../assets/images/service1.png")}>
                            </Image>
                            :
                            <Image style={styles.iconcs} source={require("../assets/images/service0.png")}>
                            </Image>
                    )
                }
            })
        },
        School: {
            screen: School,
            navigationOptions:({navigation})=>({
                tabBarLabel:"党校",
                tabBarIcon:({tintColor,focused})=>{
                    return(
                        focused?
                            <Image style={styles.iconc} source={require("../assets/images/school1.png")}>
                            </Image>
                            :
                            <Image style={styles.iconc} source={require("../assets/images/school0.png")}>
                            </Image>
                    )
                }
            })
        }


    },
    {
        tabBarOptions: {
            //当前选中的tab bar的文本颜色和图标颜色
            activeTintColor: '#ff2d2d',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#808080',
            //是否显示tab bar的图标，默认是false
            showIcon: true,
            //showLabel - 是否显示tab bar的文本，默认是true
            showLabel: true,
            //是否将文本转换为大小，默认是true
            upperCaseLabel: false,
            //material design中的波纹颜色(仅支持Android >= 5.0)
            pressColor: '#788493',
            //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
            pressOpacity: 0.8,
            //tab bar的样式
            style: {
                backgroundColor: '#fff',
                paddingBottom: 0,
                paddingTop:0,
            },
            //tab bar的文本样式
            labelStyle: {
                fontSize: 11,
                margin: 0
            },
            //tab 页指示符的样式 (tab页下面的一条线).
            indicatorStyle: {height: 0},
        },
        initialRouteName:'Home',
        //tab bar的位置, 可选值： 'top' or 'bottom'
        tabBarPosition: 'bottom',
        //是否允许滑动切换tab页
        swipeEnabled: true,
        //是否在切换tab页时使用动画
        animationEnabled: true,
        //是否懒加载
        lazy: false,
        //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
        backBehavior: 'none',
    });

let TabNavMoudle = createAppContainer(TabNav);

//抽屉导航
const Drawer= createDrawerNavigator({
    MainDrawer:{
        screen:TabNavMoudle,
        navigationOptions:{
            drawerLabel:'MainDrawer',

        }
    },
    School:{
        screen:School,
        navigationOptions:{
            drawerLabel:'School',

        }
    }
},{
    drawerWidth:width*0.80,
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName:'MainDrawer',//设置默认打开的页面
    contentOptions:{
        inactiveTintColor:'#4d3a34',//不被选中的颜色
        activeTintColor:'#ff7226',//改变选中之后的颜色
    },
    contentComponent:PerCenter,
    drawerType:"slide"
});


const AppNavigator = createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        }, // 登录页
        Reg: {
            screen: Reg,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },//注册页
        PhoneList: {
            screen: gestureHandlerRootHOC(PhoneList),
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },//通讯录
        Cost: {
            screen: Cost,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },//党费
        CostExplain: {
            screen: CostExplain,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },//党费说明
        CostSure: {
            screen: CostSure,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },//党费确认
        Map: {
            screen: Map,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },//党建地图
        Main: {//`${navigation.state.params.name}`
            screen:gestureHandlerRootHOC(Drawer),
            navigationOptions: ({navigation}) => ({
                header:null,//type 1按钮 type2 图片 btns={{type:2,desc:require("../assets/images/scale.png")}}btns={{type:1,desc:"按钮"}} clickFn={()=>{alert(0)}}

            })
        }
    },
    {
        initialRouteName: 'Main',
        headerMode: 'screen',
        mode:"modal",
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    });





export default createAppContainer(AppNavigator);

