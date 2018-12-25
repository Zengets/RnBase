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
   TouchableOpacity,     Animated,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {timetrans} from '../../../../components'

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
        fontSize:16,
        color:"#666666"
    }
}
class ExamList extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            title:props.navigation.getParam('title', 'NO-ID'),//gentitle
            types:props.navigation.getParam('types', 'NO-ID'),//gentype
            endDate: 1546219777637,
            testArr:[
                {
                   
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                    
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
                {
                    lstusrDtm: 1544088636836,
                    score:Math.ceil(Math.random() * 100), id: 1544088636836,exam:"TEST"
                },
            ],

        }
    }

    componentDidMount(){

    }
    render() {
        let { testArr,title,types,endDate } = this.state;


        return (
            <Container style={{position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>考试结果</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content>


                <View style={{position:"absolute",width:width,height:110,padding:14}}>
                    <Row style={{justifyContent:"center",alignItems:"baseline",borderBottomColor:"#666",borderBottomWidth:4,marginBottom:12,flexDirection:"row"}}>
                        <Col size={2}>
                            <Text style={styles.titles}>
                                {title}
                            </Text>
                        </Col>
                        <Col size={1.4}>
                            <Text style={styles.body}>
                                截止日期:{timetrans(endDate,"day")}
                            </Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={2}>
                            <Text style={styles.bodys}>
                                考试时间
                            </Text>
                        </Col>
                        <Col>
                            <Text style={[styles.bodys,{textAlign:"center",paddingLeft:5}]}>
                                得分
                            </Text>
                        </Col>
                        <Col>
                            <Text style={styles.body}>
                            </Text>
                        </Col>
                    </Row>

                </View>

                <ScrollView style={{marginTop:98,height:height-180,paddingLeft:14,paddingRight:14}}>
                    {
                        testArr.map((item,i)=>{
                            return(
                                <TouchableOpacity key={i} onPress={()=>{
                                    this.props.navigation.navigate("Exam",{
                                        id: item.id,
                                        title:item.exam,
                                        types:"1"
                                    })
                                }}>
                                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderTopColor:"#f0f0f0",borderTopWidth:1,paddingTop:8,paddingBottom:8}}>
                                        <Left style={{flex:2,padding:0}}>
                                            <Button iconLeft transparent full style={{flex:1,justifyContent:"center",alignItems:"center" }}>
                                                <Icon style={{color:"#DD5144",marginLeft:-14,marginRight:8}} name="back-in-time" type="Entypo"/>
                                                <Text>{timetrans(item.lstusrDtm)}</Text>
                                            </Button>
                                        </Left>
                                        <Body style={{flex:1}}>
                                        <Text>{item.score}</Text>
                                        </Body>
                                        <Right style={{flex:1}}>
                                            <Icon style={{color:"#DDD",marginRight:14,fontSize:16}} name="chevron-small-right" type="Entypo" />
                                        </Right>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                </Content>




            </Container>
        );
    }
}


export default ExamList
