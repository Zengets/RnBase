/**
 * Created by kurosaki on 2018/12/3.
 *
 */
import React, { Component } from 'react';
import { Container,Content, Header, Left, Body, Right, Button, Icon, Card,Picker, CardItem,Radio, ListItem,Thumbnail,CheckBox } from 'native-base';
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
import { Titles,SchoolExamItem,Modals } from '../../../../components';
import Swiper from 'react-native-deck-swiper';
import  data  from './DataSource'
const dataz = data.data.map((item,i)=>{
    item.checked = [];
    return item;
});

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

class ItemAnswer extends Component<Props>{
    componentWillReceiveProps(nextProps){
        if(this.props.item!=nextProps.item){
            return true
        }
    }

    render() {
        let { item,types,pressFn } = this.props;
        return(
            <Card style={{ elevation: 3,flex:0.92 }}>
                <CardItem>
                    <Body>
                    <Text>
                        {item.title}
                    </Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    <Body>
                    {
                        types=="1"?
                        <Text style={{color:"red",width:width-28,textAlign:"center",padding:14,fontSize:18}}>正确答案：{item.key}</Text>:null
                    }
                    {
                        item.options.map((items,i,arr)=>{
                            return(
                                <ListItem key={i} style={{width:width*0.8,alignSelf:"center"}}>
                                    <Left>
                                        <Text>{items.text}</Text>
                                    </Left>
                                    <Right>
                                        {
                                            item.type!=2?
                                                <Radio
                                                    color={"#DD5144"}
                                                    selectedColor={"#DD5144"}
                                                    selected={ item.checked.indexOf(items.value) != -1 }
                                                    onPress={()=>{pressFn(items)}}
                                                />:
                                                <CheckBox
                                                    color={"#DD5144"}
                                                    selectedColor={"#DD5144"}
                                                    onPress={()=>{pressFn(items)}}
                                                    checked={item.checked.indexOf(items.value)!=-1}/>
                                        }
                                    </Right>
                                </ListItem>
                            )

                        })
                    }
                    </Body>
                </CardItem>
            </Card>
        )


    }

}



class Exam extends Component<Props> {
    constructor(props){
        super(props);

        this.state={
            ifshow:false,
            selected:'',
            index:0,
            tells:"",
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            title:props.navigation.getParam('title', 'NO-ID'),//gentitle
            types:props.navigation.getParam('types', 'NO-ID'),//gentype
            card:dataz,
            total:data.questionCount
        }
    }

    componentDidMount(){
    }

    onValueChange(value: string) {
        let index = 0;
        this.state.card.map((item,i)=>{
            if(item.id==value){
                index = i
            }
        })
        this.setState({
            selected:value,
            ifshow:false,
            index:index
        },()=>{
            this.swiper.jumpToCardIndex(index);
        })

    }
    changeIndex(key){
        let {index,total}=this.state;
        if(key=="prev"){
            index--
        }else{
            index++
        }
        if(index==-1||index==total){
            return
        }
        this.setState({
            index:index,
            ifshow:false
        },()=>{
            this.swiper.jumpToCardIndex(index);
        })
    }

    render() {
        let {title,card,selected,index,total,tells,ifshow,types} = this.state;

        let picker = ()=>{
            return(
                <Picker
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="chevron-small-left" type="Entypo" style={{ color: "#fff" }} />
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
                                <Picker.Item label={`第${i+1}题`} value={item.id} key={i}/>
                            )
                        })
                    }
                </Picker>)
        }

        return (
            <Container style={styles.container}>
                <Header style={styles.heads}>
                    <Left style={{flex:1.5}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:3,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>{title}</Text>
                    </Body>
                    <Right style={{flex:1.5}}>
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
                        renderCard={(item,index) => {
                            return (
                                <ItemAnswer types={types} item={item} index={index} pressFn={(items)=>{
                                    let newcard = {...item,checked:[items.value]};
                                    if(item.type!=2){
                                        newcard = {...item,checked:[items.value]};
                                    }else{
                                        newcard = {...item,checked:[
                                        item.checked.indexOf("A") != -1&&items.value=="A"?
                                        "":
                                        item.checked.indexOf("A") == -1&&items.value=="A"?
                                        "A":
                                        item.checked.indexOf("A") == -1&&items.value!="A"?
                                        "":
                                        item.checked.indexOf("A") != -1&&items.value!="A"?
                                        "A":
                                        "A",
                                         item.checked.indexOf("B") != -1&&items.value=="B"?
                                        "":
                                        item.checked.indexOf("B") == -1&&items.value=="B"?
                                        "B":
                                        item.checked.indexOf("B") == -1&&items.value!="B"?
                                        "":
                                        item.checked.indexOf("B") != -1&&items.value!="B"?
                                        "B":
                                        "B",
                                        item.checked.indexOf("C") != -1&&items.value=="C"?
                                        "":
                                        item.checked.indexOf("C") == -1&&items.value=="C"?
                                        "C":
                                        item.checked.indexOf("C") == -1&&items.value!="C"?
                                        "":
                                        item.checked.indexOf("C") != -1&&items.value!="C"?
                                        "C":
                                        "C",
                                         item.checked.indexOf("D") != -1&&items.value=="D"?
                                        "":
                                        item.checked.indexOf("D") == -1&&items.value=="D"?
                                        "D":
                                        item.checked.indexOf("D") == -1&&items.value!="D"?
                                        "":
                                        item.checked.indexOf("D") != -1&&items.value!="D"?
                                        "D":
                                        "D",]};
                                    }

                                     let lastcard = card.map((key,i)=>{
                                            if(i==index){
                                                key= newcard
                                            }
                                            return key
                                        });
                                        this.setState({
                                            card:lastcard,
                                            ifshow:false
                                        })


                                }}></ItemAnswer>
                            )
                    }}
                        verticalSwipe = {false}
                        onSwiped={(cardIndex) => {
                            let i = cardIndex+1>total-1?total-1:cardIndex+1
                            this.setState({
                                index:i,
                                ifshow:false,
                                selected:card[i].id?card[i].id:-1
                            });
                        }}
                        onSwipedAll={() => {console.log('onSwipedAll')}}
                        cardIndex={index}
                        backgroundColor={'#fff'}
                        stackSize= {2}
                    >
                        {
                            types=="1"?
                            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",paddingTop:15}}>
                                <Text>
                                    得分：80
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
                            </View>:
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
                                <Button danger rounded full style={{height:36,width:60,borderRadius:600,marginLeft:8,justifyContent:"center",alignItems:"center"}} onPress={()=>{
                        let tells='',finish ='',unfinish='';
                        let answer = card.filter((item)=>{
                            return item.checked.length != 0
                        }),unanswer = card.filter((item)=>{
                            return item.checked.length == 0
                        });
                        if(unanswer.length==0){
                           tells = "您已完成全部答题，点击按钮提交试卷..."
                        }else if(answer.length==0){
                           tells = "您还未开始答题，请作答！"
                        }else{
                           answer.map((item,i)=>{
                                card.map((items,indexs)=>{
                                    if(item.id==items.id){
                                       finish += "第"+(indexs+1)+"题,"
                                    }
                                })
                           });
                           unanswer.map((item,i)=>{
                                 card.map((items,indexs)=>{
                                    if(item.id==items.id){
                                       unfinish += "第"+(indexs+1)+"题,"
                                    }
                                })
                           });
                           tells = `您的完成情况：已完成${finish}未完成${unfinish}确认提交？`
                        }
                        this.setState({
                            ifshow:true,
                            tells:tells
                        })

                        }}>
                                    <Text style={{color:"#fff"}}>提交</Text>
                                </Button>
                            </View>
                        }

                        <View style={{flex:1,justifyContent:"center",alignItems:"center",opacity:index==total-1?1:0}}>
                            <Text style={{fontSize:18,color:"#666"}}>
                                没有更多题目了...
                            </Text>
                        </View>

                    </Swiper>
                </View>

                <Modals show={ifshow} str={tells} btnstr={"提交"} pressFn={()=>{alert("fetch submit")}}></Modals>
            </Container>
        );
    }
}


export default Exam
