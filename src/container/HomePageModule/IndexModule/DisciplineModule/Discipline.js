/**
 * Created by kurosaki on 2018/12/7.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs, ScrollableTab , Button, Icon, Left, Right, Body,Title } from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import DisciplineList from './DisciplineList'



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

export default class Discipline extends Component<Props> {
    constructor(){
        super()
        this.state={
            page:0,
            tabs:["组织纪律","经济纪律","廉洁纪律","政治纪律"],
            disciplineList:[
                {
                    items:[
                        {
                            id:"0",
                            title:"习近平致丝路沿线民间组织论坛贺信",
                            from:"人民网",
                            time:"2018-10-26",
                            pic:[
                                {
                                    img:require("../../../../assets/images/tts1.png")
                                }
                            ]},{
                            id:"1",
                            title:"习近平：切实学懂弄通做实党的十九大精神",
                            from:"人民网",
                            time:"2018-10-26",
                            pic:[
                                {
                                    img:require("../../../../assets/images/tts0.png")
                                },{
                                    img:require("../../../../assets/images/tts1.png")
                                },{
                                    img:require("../../../../assets/images/tts2.png")
                                },

                            ]},{
                            id:"2",
                            title:"中国这5年：加强党对意识形态的领导",
                            from:"人民网",
                            time:"2018-10-26",
                            pic:[
                                {
                                    img:require("../../../../assets/images/tts0.png")
                                }
                            ]},{
                            id:"3",
                            title:"俞正声出席脱贫攻坚民主监督工作座谈会会议并讲话",
                            from:"人民网",
                            time:"2018-10-26",
                            pic:[
                                {
                                    img:require("../../../../assets/images/tts1.png")
                                }
                            ]},


                    ]
                }
            ]
        }
    }


    onRef = (ref) => {
        this.child = ref
    }


    render() {
        let {disciplineList,page,tabs} = this.state;

        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>党的纪律</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Tabs
                    page = {page}
                    style={{borderWidth:0}}
                    onChangeTab={({i,ref,from})=>{
                    if(i==page){
                        this.child._scrollToIndex();
                        return
                    }else{
                        this.setState({
                            page:i
                        })
                    }

                }}
                    tabBarUnderlineStyle={{backgroundColor:"#ff2d2d",height:1}}
                    renderTabBar={()=> <ScrollableTab tabBarUnderlineStyle={{backgroundColor:"#ff2d2d",height:1}} style={{borderWidth:0}}/>}
                >
                    {
                        tabs.map((item,i)=>{
                            return(
                                <Tab heading={item} key={i}
                                     tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                                     activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                                     activeTabStyle={{backgroundColor:"#ffffff"}}
                                     textStyle={{color:"#808080",fontWeight:"100"}}>
                                    <View style={{padding:14,flex:1}}>
                                        <DisciplineList page={page} onRef={this.onRef} data={disciplineList}></DisciplineList>
                                    </View>
                                </Tab>
                            )
                        })
                    }
                </Tabs>


            </Container>
        );
    }
}