/**
 * Created by kurosaki on 2018/12/3.
 */

import React, { Component } from 'react';
import { Container,Content, Header, Left, Body, Right, Button, Icon, Card,Picker, CardItem, Thumbnail } from 'native-base';
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
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Titles,SchoolExamItem } from '../../../../components'
import Swiper from 'react-native-deck-swiper'

const { width,height } = Dimensions.get('window')
const styles={
    heads:{
        backgroundColor:"#DD5144"
    },
    container: {
        flex: 1,
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
}
class Exam extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            selected:'',
            index:0,
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            title:props.navigation.getParam('title', 'NO-ID'),//gentitle
            card:[
                {
                    text: 'CardOne',
                    name: 'One',
                    image: require('../../../../assets/images/timg.jpg'),
                },
                {
                    text: 'CardTwo',
                    name: 'One',
                    image: require('../../../../assets/images/timg1.jpg'),
                },
                {
                    text:'CardThree' ,
                    name: 'One',
                    image: require('../../../../assets/images/timg2.jpg'),
                },
            ]

        }
    }

    componentDidMount(){
    }

    onValueChange(value: string) {
        let index = 0;
        this.state.card.map((item,i)=>{
            if(item.text==value){
                index = i
            }
        })
        this.setState({
            selected:value,
            index:index
        })
        setTimeout(()=>{
            this.swiper.jumpToCardIndex(index);
        },100)

    }
    changeIndex(key){
        let {index,card}=this.state,
            total = card.length;
        if(key=="prev"){
            index--
        }else{
            index++
        }
        if(index==-1||index==total){
            return
        }
        this.setState({
            index:index
        })
        setTimeout(()=>{
            this.swiper.jumpToCardIndex(index);
        },100)
    }


    render() {
        let {isSpin,title,card,selected,index} = this.state,
            total = card.length;

        let picker = ()=>{
            return(
                <Picker
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>选择组织</Title>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" style={{color:"#fff"}}/>}
                    selectedValue={selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    {
                        card.map((item,i)=>{
                            return(
                                <Picker.Item label={item.text} value={item.text} key={i}/>
                            )
                        })
                    }
                </Picker>)
        }

        return (
            <Container style={styles.container}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>{title}</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        {picker()}
                    </Right>
                </Header>
                <View style={{flex:1,background:"lightblue"}}>
                    <Swiper
                        ref={swiper => {
                            this.swiper = swiper
                        }}
                        style={{flex:1}}
                        cards={card}
                        renderCard={(item) => {
                        return (
                            <Card style={{ elevation: 3,flex:0.89 }}>
                                <CardItem>
                                  <Left>
                                    <Thumbnail source={item.image} />
                                    <Body>
                                      <Text>{item.text}</Text>
                                      <Text note>NativeBase</Text>
                                    </Body>
                                  </Left>
                                </CardItem>
                                <CardItem cardBody>
                                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                                </CardItem>
                                <CardItem>
                                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                  <Text>{item.name}</Text>
                                </CardItem>
                          </Card>
                        )
                    }}
                        animateCardOpacity = {true}
                        verticalSwipe = {false}
                        onSwiped={(cardIndex) => {

                            this.setState({
                                index:cardIndex+1>total-1?total-1:cardIndex+1
                            })
                        }}
                        onSwipedAll={() => {console.log('onSwipedAll')}}
                        cardIndex={0}
                        backgroundColor={'#fff'}
                        stackSize= {2}
                    >
                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",paddingTop:15}}>
                            <Text>
                                剩余时间：20:10
                            </Text>
                            <Button disabled={index==0?true:false} danger={index==0?false:true} rounded full style={{width:36,height:36,borderRadius:600,marginLeft:8,marginRight:8}} onPress={()=>this.changeIndex("prev")}>
                                <Icon style={{marginLeft:5}} name="chevron-small-left" type="Entypo"></Icon>
                            </Button>
                            <Text>
                                第{index+1}题
                            </Text>
                            <Button disabled={index==total-1?true:false} danger={index==total-1?false:true} rounded full style={{width:36,height:36,borderRadius:600,marginLeft:8,marginRight:8}} onPress={()=>this.changeIndex("next")}>
                                <Icon style={{marginLeft:5}} name="chevron-small-right" type="Entypo"></Icon>
                            </Button>
                            <Text>
                                共{total}题
                            </Text>
                            <Button danger rounded full style={{height:36,width:60,borderRadius:600,marginLeft:8,justifyContent:"center",alignItems:"center"}}>
                               <Text style={{color:"#fff"}}>提交</Text>
                            </Button>
                        </View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:18,color:"#666"}}>
                                没有更多题目了...
                            </Text>
                        </View>

                    </Swiper>
                </View>



            </Container>
        );
    }
}


export default Exam
