/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import { Container, Header, Content, H1, H2, H3,Fab, Button, Icon, Left, Right, Body,Title  } from 'native-base';
import Swiper from '@nart/react-native-swiper';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Animated,
    TouchableNativeFeedback
} from 'react-native';
import PerCenter from './PerCenterModule/PerCenter'
import { NewsItem,Titles } from '../../components'
import SplashScreen from 'react-native-splash-screen';

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
        borderBottomWidth:10,
        paddingTop:10,
        paddingBottom:10
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
    },
    notice:{
        width:width,
        height:48,
        flexDirection:"row",
        alignItems:"center",
        borderBottomColor:"#eeeff0",
        borderBottomWidth:1
    },
    textcover:{
        flex:1,
        height:48,
        overflow:"hidden",
    },
    textitem:{
        height:48,
        overflow:"hidden",
        paddingLeft:16
    },
    newscontain:{
        width:width,
        borderBottomColor:"#eeeff0",
        borderBottomWidth:10
    },
    newsmain:{
        width:width,
    },
    maincontain:{
        padding:14,
        paddingTop:0,
    }

}
export default class HomePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            inter:null,
            Anim: new Animated.Value(0),  // 初始值设为0
            active: false,
            noticebar:[{
                title:"曹明涛1号"
            },{
                title:"曹明涛2号"
            },{
                title:"曹明涛3号"
            }],
            navbar:[{
                name:"通讯录",
                img:require("../../assets/images/indexicon_03.png"),
                uri:"PhoneList"
            },{
                name:"党费缴纳",
                img:require("../../assets/images/indexicon_05.png"),
                uri:"Cost"
            },{
                name:"党建地图",
                img:require("../../assets/images/indexicon_07.png"),
                uri:"Map"
            },{
                name:"党建看板",
                img:require("../../assets/images/indexicon_13.png"),
                uri:""
            },{
                name:"临时党组织",
                img:require("../../assets/images/indexicon_24.png"),
                uri:"Temporary"
            },{
                name:"党的纪律",
                img:require("../../assets/images/indexicon_21.png"),
                uri:"Discipline"
            },{
                name:"反腐倡廉",
                img:require("../../assets/images/indexicon_22.png"),
                uri:"Anti"
            },
            ],
            tabbar:[{
                img:require("../../assets/images/noticepic.png"),
                uri:"/home"
            },{
                img:require("../../assets/images/noticepic1.png"),
                uri:"/home"
            },{
                img:require("../../assets/images/noticepic.png"),
                uri:"/home"
            }],
            newsList:[
                {
                id:0,
                title:"习近平致丝路沿线民间组织论坛贺信",
                from:"人民网",
                time:"2018-10-26",
                pic:[
                    {
                        img:require("../../assets/images/tts1.png")
                    }
                ]},{
                id:1,
                title:"习近平：切实学懂弄通做实党的十九大精神",
                from:"人民网",
                time:"2018-10-26",
                pic:[
                    {
                        img:require("../../assets/images/tts0.png")
                    },{
                        img:require("../../assets/images/tts1.png")
                    },{
                        img:require("../../assets/images/tts2.png")
                    },

                ]},{
                id:2,
                title:"中国这5年：加强党对意识形态的领导",
                from:"人民网",
                time:"2018-10-26",
                pic:[
                    {
                        img:require("../../assets/images/tts0.png")
                    }
                ]},{
                title:"俞正声出席脱贫攻坚民主监督工作座谈会会议并讲话",
                from:"人民网",
                time:"2018-10-26",
                pic:[
                    {
                        img:require("../../assets/images/tts1.png")
                    }
                ]},


            ]

        };
    }




    componentDidMount() {
        try {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': '是否同意打开定位权限',
                    'message': '允许获取您当前的位置?'
                }
            )
        } catch (err) {

        }
        SplashScreen.hide();
    }


    render() {
        let {navbar,Anim,noticebar,tabbar,newsList} = this.state,
            {  navigation } = this.props;


        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={styles.imagehead}>
                            <ImageBackground
                                style={{width:36,height:36}}
                                source={require('../../assets/images/headtemp.jpg')}
                                resizeMode='cover'>
                            </ImageBackground>
                        </TouchableOpacity>

                    </Left>
                    <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{color:"#fff",fontSize:20}}>党建</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Button transparent>
                            <Icon name="ios-qr-scanner" />
                        </Button>
                    </Right>
                </Header>
                <ScrollView showsVerticalScrollIndicator = {false} >
                    <View style={styles.wrapper}>
                        <Swiper
                            height={200}
                            onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            paginationStyle={{
                        bottom: -23, left: null, right: 10
                    }} loop autoplay>
                            <View style={styles.slide} title={<Text numberOfLines={1}>新闻1标题</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts0.png')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                            <View style={styles.slide} title={<Text numberOfLines={1}>新闻2标题</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts1.png')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                            <View style={styles.slide} title={<Text numberOfLines={1}>新闻3标题</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts2.png')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                        </Swiper>
                    </View>
                    <View style={styles.icongroup}>
                        {
                            navbar.map((item,i)=>{
                                return(
                                    <TouchableNativeFeedback
                                        key={i}
                                        onPress={()=>{ navigation.navigate(item.uri);}}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <View style={styles.item}>
                                            <Image style={{width:0.14*width,height:0.14*width,marginBottom:10}} source={item.img}></Image>
                                            <Text>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )

                            })
                        }
                    </View>
                    <View style={styles.notice}>
                        <View style={{width:110,height:48,justifyContent:"center",alignItems:"center",borderRightColor:"#f0f0f0",borderRightWidth:1}}>
                            <Image style={{width:86,height:20}} source={require("../../assets/images/noticebar.png")}></Image>
                        </View>
                        <View style={styles.textcover}>
                            <Swiper style={styles.textcover} height={48} horizontal={false} showsPagination={false} loop autoplay>
                                {
                                    noticebar.map((item,i)=>{
                                        return(
                                            <View key={i} style={styles.textitem}>
                                                <Text style={{lineHeight:48}}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </Swiper>
                        </View>

                    </View>
                    <View style={styles.newscontain}>
                        <ScrollView showsVerticalScrollIndicator = {false} horizontal={true} style={{padding:10}}>
                            {
                                tabbar.map((item,i)=>{
                                    return(
                                        <TouchableNativeFeedback key={i} onPress={()=>{this.props.navigation.navigate("Activity",{
                                            index: i,
                                        })}}>
                                            <View style={{paddingLeft:i==0?0:10}}>
                                                <Image source={item.img} style={{width:200,height:70}}></Image>
                                            </View>
                                        </TouchableNativeFeedback>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={styles.newsmain}>
                        <Titles titles = {"党内要闻"} clickFn={()=>{this.props.navigation.navigate("AllNews")}}></Titles>
                        <View style={styles.maincontain}>
                            {
                                newsList.map((item,i)=>{
                                    return(
                                        <NewsItem pressFn={()=>{this.props.navigation.navigate("NewsDetail",{
                                            id: item.id,
                                        })}} item={item} key={i}></NewsItem>
                                    )
                                })
                            }
                        </View>



                    </View>




                </ScrollView>



        </Container>



        );
    }
}