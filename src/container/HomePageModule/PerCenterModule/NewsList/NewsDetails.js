/**
 * Created by kurosaki on 2018/12/20.
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
    Platform,
    StatusBar,
    WebView,
    TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { timetrans } from '../../../../components'
let styles = {
    container:{
        flex:1,
    }
}

const { width,height } = Dimensions.get('window')


export default class NewsDetails extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            index:props.navigation.getParam('id', 'NO-ID'),
            curitem:{
                id:4,
                name:"消息5",
                timeStamp:1543995443552,
                content:"<p>this is a news content</p>"
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
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>消息详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <Col>
                        <View style={{borderLeftColor:"#DD5144",borderLeftWidth:4,paddingLeft:16,justifyContent:"flex-end",marginTop:15}}>
                            <Text style={{fontSize:16,color:"#333"}}>
                                {curitem.name}
                            </Text>
                        </View>
                        <Row style={{alignItems:"center"}}>
                            <Icon name="clock" type="Feather" style={{fontSize:16,color:"#999"}}></Icon>
                            <Text style={{fontSize:14,color:"#666",marginBottom:15,marginTop:15,marginLeft:6}}>
                                {timetrans(curitem.timeStamp)}
                            </Text>
                        </Row>
                    </Col>
                    <Row>
                        <WebView originWhitelist={Platform.OS=="ios"?"*":null}  style={{width:width-28,height:168,alignSelf:"center",backgroundColor:"#f9f9f9"}} source={{ html: curitem.content, baseUrl: '' }}></WebView>
                    </Row>


                </Content>


            </Container>
        );
    }
}






































































































































































