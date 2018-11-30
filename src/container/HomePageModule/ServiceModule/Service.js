/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs, ScrollableTab , Button, Icon, Left, Right, Body,Title} from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import PerCenter from '../PerCenterModule/PerCenter';
import ServiceList from './ServiceList/ServiceList'

const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex: 1
    },
    wrapper: {
        width:width,
        height:200,
        paddingBottom:32,

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    },
    icongroup:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        borderTopColor:"#f0f0f0",
        borderTopWidth:10,
        flexWrap:"wrap",
        borderBottomColor:"#eeeff0",
        borderBottomWidth:10
    },
    item:{
        width:0.25*width,
        height:0.25*width,
        justifyContent:"center",
        alignItems:"center"
    },
    imagehead:{
        width:36,
        height:36,
        borderRadius:600,
        overflow:"hidden"
    }
}

export default class Service extends Component<Props> {
    constructor(){
        super()
        this.state={
            serviceList:[{
                id:Math.ceil(Math.random() * 100),
                name:"5411医疗服务",
                curnum:1,
                totalnum:3,
                addr:"河桥街道",
                type:"医疗服务"
            },{
                id:Math.ceil(Math.random() * 100),
                name:"54法律服务",
                curnum:1,
                totalnum:3,
                addr:"玉林街道",
                type:"法律服务"
            },{
                id:Math.ceil(Math.random() * 100),
                name:"541教育服务",
                curnum:3,
                totalnum:3,
                addr:"河桥街道",
                type:"教育服务"
            },{
                id:Math.ceil(Math.random() * 100),
                name:"5411就业服务",
                curnum:1,
                totalnum:3,
                addr:"河桥街道",
                type:"就业服务"
            },{
                id:Math.ceil(Math.random() * 100),
                name:"5411医疗服务",
                curnum:1,
                totalnum:3,
                addr:"河桥街道",
                type:"医疗服务"
            }]
        }
    }



    render() {
        let {serviceList} = this.state;

        return (
            <Container>
                <Header style={{paddingTop:20,height:68,backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={styles.imagehead}>
                            <ImageBackground
                                style={{width:36,height:36}}
                                source={require('../../../assets/images/headtemp.jpg')}
                                resizeMode='cover'>
                            </ImageBackground>
                        </TouchableOpacity>

                    </Left>
                    <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>服务</Text>
                    </Body>
                    <Right style={{flex:1}}>

                    </Right>
                </Header>
                <Tabs
                    style={{borderWidth:0}}
                    tabBarUnderlineStyle={{backgroundColor:"#ff2d2d",height:1}}
                    renderTabBar={()=> <ScrollableTab tabBarUnderlineStyle={{backgroundColor:"#ff2d2d",height:1}} style={{borderWidth:0}}/>}

                >
                    <Tab heading="全部"
                         tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                         activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                         activeTabStyle={{backgroundColor:"#ffffff"}}
                         textStyle={{color:"#808080",fontWeight:"100"}}>
                        <View style={{padding:14}}>
                            <ServiceList data = {serviceList}></ServiceList>
                        </View>

                    </Tab>
                    <Tab heading="就业服务" tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                         activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                         activeTabStyle={{backgroundColor:"#ffffff"}}
                         textStyle={{color:"#808080",fontWeight:"100"}}>
                        <View style={{padding:14}}>
                            <ServiceList data = {serviceList}></ServiceList>
                        </View>
                    </Tab>
                    <Tab heading="法律服务" tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                         activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                         activeTabStyle={{backgroundColor:"#ffffff"}}
                         textStyle={{color:"#808080",fontWeight:"100"}}>
                        <View style={{padding:14}}>
                            <ServiceList data = {serviceList}></ServiceList>
                        </View>
                    </Tab>
                    <Tab heading="教育服务" tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                         activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                         activeTabStyle={{backgroundColor:"#ffffff"}}
                         textStyle={{color:"#808080",fontWeight:"100"}}>
                        <View style={{padding:14}}>
                            <ServiceList data = {serviceList}></ServiceList>
                        </View>
                    </Tab>
                    <Tab heading="医疗服务" tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                         activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                         activeTabStyle={{backgroundColor:"#ffffff"}}
                         textStyle={{color:"#808080",fontWeight:"100"}}>
                        <View style={{padding:14}}>
                            <ServiceList data = {serviceList}></ServiceList>
                        </View>
                    </Tab>
                    <Tab heading="助老助残" tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                         activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                         activeTabStyle={{backgroundColor:"#ffffff"}}
                         textStyle={{color:"#808080",fontWeight:"100"}}>
                        <View style={{padding:14}}>
                            <ServiceList data = {serviceList}></ServiceList>
                        </View>
                    </Tab>
                    <Tab heading="家政服务" tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                         activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                         activeTabStyle={{backgroundColor:"#ffffff"}}
                         textStyle={{color:"#808080",fontWeight:"100"}}>
                        <View style={{padding:14}}>
                            <ServiceList data = {serviceList}></ServiceList>
                        </View>
                    </Tab>











                </Tabs>


            </Container>
        );
    }
}