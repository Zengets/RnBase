/**
 * Created by kurosaki on 2018/9/3.
 */
import React from 'react';
import { createBottomTabNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import { Login,Reg,HomePage,News,PerCenter,School,Service } from '../container'
import { Header } from 'native-base'
import {
    Image,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";



const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});

const TabNav = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions:({navigation})=>({
                tabBarLabel:"大炮app",
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
        Friend: {
            screen: News,
            navigationOptions:({navigation})=>({
                tabBarLabel:"尬聊",
                tabBarIcon:({tintColor,focused})=>{
                    return(
                        focused?
                            <Image style={styles.icon} source={require("../assets/images/chart1.png")}>
                            </Image>
                            :
                            <Image style={styles.icon} source={require("../assets/images/chart0.png")}>
                            </Image>
                    )
                }
            })
        },
        Mine: {
            screen: PerCenter,
            navigationOptions:({navigation})=>({
                tabBarLabel:"个人中心",
                tabBarIcon:({tintColor,focused})=>{
                    return(
                        focused?
                            <Image style={styles.icon} source={require("../assets/images/mine1.png")}>
                            </Image>
                            :
                            <Image style={styles.icon} source={require("../assets/images/mine0.png")}>
                            </Image>
                    )
                }
            })
        }
    },
    {
        tabBarOptions: {
            //当前选中的tab bar的文本颜色和图标颜色
            activeTintColor: 'rgba(93,101,149,1)',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#000',
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
        },
        Main: {//`${navigation.state.params.name}`
            screen:TabNavMoudle,
            navigationOptions: ({navigation}) => ({
                header:null,//type 1按钮 type2 图片 btns={{type:2,desc:require("../assets/images/scale.png")}}btns={{type:1,desc:"按钮"}} clickFn={()=>{alert(0)}}

            })
        }
    },
    {
        initialRouteName: 'Login',
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

