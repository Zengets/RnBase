/**
 * Created by kurosaki on 2018/12/10.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs,Toast, ScrollableTab , Button, Icon, Left, Right, Body,Title,Spinner} from 'native-base';
import {
    Text,
    View,
    Image,
    Animated,
    ImageBackground,
    Dimensions,
    FlatList,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { timetrans } from '../../../../components'
let styles = {
    container:{
        flex:1,
    }
}

const { width,height } = Dimensions.get('window')


export default class ActivityDetail extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            index:props.navigation.getParam('id', 'NO-ID'),
            curitem:{
                "end": true,
                "imgUrl": null,
                "countClick": 3,
                "actId": 60,
                "location": "南京江宁",
                "description":"余林社区居民参加妇女维权讲座余林社区居民参加妇女维权讲座",
                "title": "余林社区居民参加妇女维权讲座余林社区居民参加妇女维权讲座",
                "userName": "杭华",
                "bgtime": 1536886800000
            }
        }
        //this.child._scrollToIndex();
    }


    render() {
        let { curitem } = this.state;

        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>活动详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Grid style={{padding:14,justifyContent:"flex-start"}}>
                    <Row style={{height:40,marginBottom:8,alignItems:"center"}}>
                        <Col>
                            <Text numberOfLines={2} style={{fontSize:18}}>
                                {curitem.title}
                            </Text>
                        </Col>
                        <Col style={{width:48}}>
                            <Text style={{textAlign:"right",color:curitem.end?"#ddd":"#ff0000"}}>
                                {curitem.end?"已结束":"进行中"}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={{width:width-28,height:130,marginBottom:14}}>
                        <ImageBackground  resizeMode='cover' style={{width:width-28,height:130,borderRadius:8}} source={curitem.imgUrl?{uri:curitem.imgUrl}:require("../../../../assets/images/default.png")}>
                        </ImageBackground>
                    </Row>
                    <Row style={{height:30}}>
                        <Col style={{width:68}}>
                            <Text>
                                活动时间
                            </Text>
                        </Col>
                        <Col>
                            <Text>
                                {timetrans(curitem.bgtime)}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={{height:30}}>
                        <Col style={{width:68}}>
                            <Text>
                                活动地点
                            </Text>
                        </Col>
                        <Col>
                            <Text>
                                {curitem.location}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={{marginBottom:14}}>
                        <Col style={{width:68}}>
                            <Text>
                                活动简介
                            </Text>
                        </Col>
                        <Col>
                            <Text>
                                {curitem.description}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={{height:85,justifyContent:"center",alignItems:"center"}}>
                        <Button danger rounded style={{width:80,height:80,justifyContent:"center",alignItems:"center"}} onPress={()=>this.props.navigation.navigate("ScanScreen")}>
                            <Icon type="MaterialCommunityIcons" name="qrcode-scan"></Icon>
                        </Button>
                    </Row>

                </Grid>


            </Container>
        );
    }
}






































































































































































