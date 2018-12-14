/**
 * Created by kurosaki on 2018/12/13.
 */
import React, { Component } from 'react';
import { Container, Header,Content, Left, Body, Right, Button, Icon,Picker,ListItem } from 'native-base';
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
    WebView,
    TouchableNativeFeedback
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {timetrans} from '../../../../components'
import Pdf from 'react-native-pdf';


const { width,height } = Dimensions.get('window')
const styles={
    heads:{
        backgroundColor:"#DD5144"
    },
    titles:{
        fontSize:18,
        color:"#DD5144"
    },
    body:{
        fontSize:14,
        color:"#666666"
    },
    bodys:{
        fontSize:18,
        color:"#333",
        padding:14,
        backgroundColor:"#f0f0f0"
    },
    topview:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        padding:14,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1
    },
    book:{
        width:80,
        height:100,
        borderRadius:8,
        borderColor:"rgba(221,81,68,0.4)",
        borderWidth:1,
        overflow:"hidden"
    },
    container: {
        width:width,
        height:height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position:"absolute",
        backgroundColor:"lightblue"
    },
    pdf: {
        flex:1,
        width:width,
    },
    rbtn:{
        width:60,
        height:160,
        position:"absolute",
        bottom:0
    }
}
class SchoolBook extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            title:props.navigation.getParam('title', 'NO-ID'),//gentitle
            endDate: 1546219777637,
            testArr:{
                source :{uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true},
                content: "<p>第一段描述</p><p>第二段描述</p><p>第三段描述</p>"
            },
            pages:{
                total:1,
                pageindex:1
            },
            marginAnim: new Animated.Value(400),
            absoluteAnim: new Animated.Value(height*2),
            Anim: new Animated.Value(-60),
        }
        this.marginIn =  Animated.timing(
            this.state.marginAnim,
            {
                toValue: 0,
                duration: 500,
            }
        );
        this.marginOut = Animated.timing(
            this.state.marginAnim,
            {
                toValue: (height-120)/2,
                duration: 500,
            }
        );
        this.absoluteIn = Animated.timing(
            this.state.absoluteAnim,
            {
                toValue: 0,
                duration: 500,
            }
        );
        this.absoluteOut = Animated.timing(
            this.state.absoluteAnim,
            {
                toValue: height*2,
                duration: 500,
            }
        );
        this.rtIn = Animated.timing(
            this.state.Anim,
            {
                toValue: 0,
                duration: 500,
            }
        );
        this.rtOut = Animated.timing(
            this.state.Anim,
            {
                toValue: -60,
                duration: 500,
            }
        );
        this.sequenceIn = Animated.sequence([this.marginOut,this.absoluteIn,this.rtIn]);
        this.sequenceOut = Animated.sequence([this.rtOut,this.absoluteOut,this.marginIn]);

    }

    componentDidMount(){
        this.marginIn.start();
    }

    render() {
        let { testArr,title,marginAnim,absoluteAnim,Anim,pages } = this.state;


        return (
            <Container style={{flex:1,position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>图书详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.topview}>
                        <Animated.View style={[styles.book,{marginRight:marginAnim}]}>
                            <ImageBackground
                                resizeMode='cover'
                                style={{width:80,height:100}}
                                source={require("../../../../assets/images/timg.jpg")}
                            ></ImageBackground>
                        </Animated.View>
                        <Animated.View style={{paddingLeft:20,paddingRight:20,width:width-188,padding:marginAnim,justifyContent:"center",alignItems:"center"}}>
                            <Text numberOfLines={3} style={{fontSize:16,color:"#333",lineHeight:24}}>
                                {title}
                            </Text>
                        </Animated.View>
                        <Animated.View style={{width:80,height:80,borderRadius:600,marginLeft:marginAnim}}>
                            <Button danger rounded full style={{width:80,height:80,marginTop:10,borderRadius:600}} onPress={()=>{
                                Animated.sequence([this.marginOut,this.absoluteIn,this.rtIn]).start();
                            }}>
                                <Text style={{color:"#fff",fontSize:14}}>
                                    开始阅读
                                </Text>
                            </Button>
                        </Animated.View>
                    </View>
                    <Animated.View>
                        <Text style={styles.bodys}>
                            简介
                        </Text>
                        <WebView style={{width:width-14,height:height-269,alignSelf:"center",marginTop:14}} source={{ html: testArr.content, baseUrl: '' }}>
                        </WebView>
                    </Animated.View>

                </Content>
                <Animated.View style={[styles.container,{top:absoluteAnim}]}>
                    <Pdf
                        source={testArr.source}
                        onLoadComplete={(numberOfPages,filePath)=>{
                            this.setState({
                                pages:{...pages,total:numberOfPages}
                            })
                        }}
                        onPageChanged={(page,numberOfPages)=>{
                            this.setState({
                                pages:{...pages,pageindex:page}
                            })
                        }}
                        onError={(error)=>{
                            console.log(error);
                        }}
                        style={styles.pdf}/>
                </Animated.View>
                <Animated.View style={[styles.rbtn,{right:Anim}]}>
                    <View style={{justifyContent:"space-around",alignItems:"center"}}>
                        <Button bordered rounded full danger style={{width:50,height:50,borderRadius:60,justifyContent:"center",alignItems:"center"}} onPress={()=>{
                         Animated.sequence([this.rtOut,this.absoluteOut,this.marginIn]).start();
                        }}>
                            <Icon name="close" type="EvilIcons" style={{textAlign:"center"}}></Icon>
                        </Button>
                        <Button transparent full danger style={{width:50,height:100,justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                            <Text style={{paddingBottom:10,marginBottom:10,borderBottomColor:"#333",borderBottomWidth:1}}>
                                第{pages.pageindex}页
                            </Text>
                            <Text>
                                共{pages.total}页
                            </Text>
                        </Button>

                    </View>




                </Animated.View>



            </Container>
        );
    }
}


export default SchoolBook
