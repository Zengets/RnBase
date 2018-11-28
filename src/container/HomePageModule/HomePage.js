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
    },
    notice:{
        width:width,
        height:48,
        flexDirection:"row",
        alignItems:"center",
        borderBottomColor:"#eeeff0",
        borderBottomWidth:10
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
                uri:"/home"
            },{
                name:"党费缴纳",
                img:require("../../assets/images/indexicon_05.png"),
                uri:"/home"
            },{
                name:"党建地图",
                img:require("../../assets/images/indexicon_07.png"),
                uri:"/home"
            },{
                name:"党建看板",
                img:require("../../assets/images/indexicon_13.png"),
                uri:"/home"
            },{
                name:"临时党组织",
                img:require("../../assets/images/indexicon_24.png"),
                uri:"/home"
            },{
                name:"党的纪律",
                img:require("../../assets/images/indexicon_21.png"),
                uri:"/home"
            },{
                name:"反腐倡廉",
                img:require("../../assets/images/indexicon_22.png"),
                uri:"/home"
            },


            ]

        };
    }


    _onPressButton(uri){
        alert(uri)
    }

    componentDidMount(){
    }

    render() {
        let {navbar,Anim,noticebar} = this.state;


        return (
            <Container>
                <StatusBar backgroundColor = {'#DD5144'}></StatusBar>
                <Header style={{paddingTop:20,height:68,backgroundColor:"#DD5144"}}>
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
                <ScrollView>
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
                                    source={require('../../assets/images/tts0.jpg')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                            <View style={styles.slide} title={<Text numberOfLines={1}>新闻2标题</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts1.jpg')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                            <View style={styles.slide} title={<Text numberOfLines={1}>新闻3标题</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts2.jpg')}
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
                                        onPress={()=>this._onPressButton(item.uri)}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <View style={styles.item}>
                                            <Image style={{width:0.1*width,height:0.1*width,marginBottom:10}} source={item.img}></Image>
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
                </ScrollView>



        </Container>



        );
    }
}