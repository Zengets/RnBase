/**
 * Created by kurosaki on 2018/12/10.
 */

import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs, ScrollableTab , Button, Icon, Left, Right, Body,Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    Image,
    Platform,
    ImageBackground,
    Dimensions,
    ScrollView,
    WebView,
    TouchableOpacity,
} from 'react-native';
import {timetrans} from '../../../../components'

const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
    }

}


export default class NewsDetail extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
           id:props.navigation.getParam('id', 'NO-ID'),//genid
           curitem:{
               "summary": "",
               "isComment": "0",
               "countClick": 12,
               "hasLiked": "1",
               "source": "蒋王街道 余林社区",
               "countLikeArticle": 1,
               "title": "区委领导赴余林社区调研指导社区建设工作",
               "type": "45",
               "content": "<p><span style=\"font-size: 16px;\">&nbsp; &nbsp; &nbsp; 10月31日下午，区委常委、组织部孙部长一行来到我社区调研指导社区建设工作。</span></p>\n<p><span style=\"font-size: 16px;\">&nbsp; &nbsp; &nbsp; 孙部长一行先后参观了社区一站式办公大厅、党员活动室、老年大学、社区文化墙等阵地。孙部长对社区建设方面的创新举措、标准化建设的硬件配置、党建创新项目&ldquo;十微党建&rdquo;等进行了肯定，并就社区建设和党建特色进行了深入细致的交流。</span></p>\n<p><span style=\"font-size: 16px;\">　 &nbsp; 这次调研指导对社区建设工作既是一种肯定，也是一次促进。今后，余林社区党支部将进一步完善社区建设工作，使社区工作扎根基层、深入人心，坚持围绕中心，服务大局，使基层社区建设工作呈良好态势发展。</span></p>",
               "imgUrl": "http://112.4.210.163:9077/ftp/dangjian/img/60d6d571502f4d659b7c20589b625f45.png",
               "createBy": "杭华",
               "createTime": 1542701600531,
               "atcSeq": 79
           }
        }
    }


    render() {
        let {curitem} = this.state;


        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <ScrollView style={{padding:14}}>
                    <Text style={{fontSize:18,color:"#333"}}>
                        {curitem.title}
                    </Text>
                    <View style={{justifyContent:"space-between",alignItems:"center",flexDirection:"row",marginTop:10,marginBottom:10}}>
                        <Text style={{fontSize:14,color:"#666"}}>{curitem.source}</Text>
                        <Text style={{fontSize:14,color:"#666"}}>{timetrans(curitem.createTime)}</Text>
                    </View>
                    <ImageBackground resizeMode='cover' style={{width:width-28,height:130,borderRadius:8,marginBottom:14}} source={curitem.imgUrl?{uri:curitem.imgUrl}:require("../../../../assets/images/default.png")}>
                    </ImageBackground>
                    <WebView originWhitelist={Platform.OS=="ios"?"*":null}  style={{width:width-28,height:230,flex:1}} source={{ html: curitem.content, baseUrl: '' }}>
                    </WebView>
                    <Button bordered danger transparent iconLeft rounded full style={{width:140,alignSelf:"center",height:40,borderRadius:600,marginTop:16}}>
                        <Icon name="heart" style={{marginLeft:-12,color:"#ff0000"}} type="Entypo"></Icon>
                        <Text style={{color:"#666"}}> {curitem.countLikeArticle}人喜欢</Text>
                    </Button>


                </ScrollView>



            </Container>

        );
    }
}