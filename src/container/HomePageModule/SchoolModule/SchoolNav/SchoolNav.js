/**
 * Created by kurosaki on 2018/12/12.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs, ScrollableTab , Button, Icon, Left, Right, Body,Title} from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import SchoolList from '../SchoolList/SchoolList'

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

export default class SchoolNav extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            type:props.navigation.getParam('type', 'NO-ID'),//gentype
            page:0,
            layout:"grid",
            nav:["党史","学习经典","党章党规","红色教育","领袖故事"],
            schoolList:[{
                items:[
                    {
                        id:Math.ceil(Math.random() * 100),
                        name:"历史的轨迹：中国共产党",
                        desc:"历史的轨迹：中国共产党历史的轨迹：中国共产党",
                        imgUrl:require("../../../../assets/images/timg.jpg")
                    },
                    {
                        id:Math.ceil(Math.random() * 100),
                        name:"中国共产党简史",
                        desc:"中国共产党简史中国共产党简史中国共产党简史中国共产党简史中国共产党简",
                        imgUrl:require("../../../../assets/images/timg1.jpg")
                    },
                    {
                        id:Math.ceil(Math.random() * 100),
                        name:"中国共产党人物转",
                        desc:"中国共产党人物转中国共产党人物转中国共产党人物转中国共产党人物转",
                        imgUrl:require("../../../../assets/images/timg2.jpg")
                    },
                    {
                        id:Math.ceil(Math.random() * 100),
                        name:"历史的轨迹：中国共产党",
                        desc:"历史的轨迹：中国共产党历史的轨迹：中国共产党",
                        imgUrl:require("../../../../assets/images/timg.jpg")
                    },
                    {
                        id:Math.ceil(Math.random() * 100),
                        name:"中国共产党简史",
                        desc:"中国共产党简史中国共产党简史中国共产党简史中国共产党简史中国共产党简",
                        imgUrl:require("../../../../assets/images/timg2.jpg")
                    },
                    {
                        id:Math.ceil(Math.random() * 100),
                        name:"历史的轨迹：中国共产党",
                        desc:"历史的轨迹：中国共产党历史的轨迹：中国共产党",
                        imgUrl:require("../../../../assets/images/timg.jpg")
                    }
                ]
            }],
            schoolLists:[{
                items:[
                    {
                        rendera:{
                            id:Math.ceil(Math.random() * 100),
                            name:"历史的轨迹：中国共产党",
                            desc:"历史的轨迹：中国共产党历史的轨迹：中国共产党",
                            imgUrl:require("../../../../assets/images/timg.jpg")
                        },
                        renderb:{
                        id:Math.ceil(Math.random() * 100),
                        name:"中国共产党简史",
                        desc:"中国共产党简史中国共产党简史中国共产党简史中国共产党简史中国共产党简",
                        imgUrl:require("../../../../assets/images/timg1.jpg")
                        }
                    },
                    {
                        rendera: {
                            id:Math.ceil(Math.random() * 100),
                            name:"中国共产党人物转",
                            desc:"中国共产党人物转中国共产党人物转中国共产党人物转中国共产党人物转",
                            imgUrl:require("../../../../assets/images/timg2.jpg")
                        },
                        renderb:{
                            id:Math.ceil(Math.random() * 100),
                            name:"历史的轨迹：中国共产党",
                            desc:"历史的轨迹：中国共产党历史的轨迹：中国共产党",
                            imgUrl:require("../../../../assets/images/timg.jpg")
                        }
                    },
                    {
                        rendera: {
                            id:Math.ceil(Math.random() * 100),
                            name:"中国共产党简史",
                            desc:"中国共产党简史中国共产党简史中国共产党简史中国共产党简史中国共产党简",
                            imgUrl:require("../../../../assets/images/timg2.jpg")
                        },
                        renderb:  {
                            id:Math.ceil(Math.random() * 100),
                            name:"历史的轨迹：中国共产党",
                            desc:"历史的轨迹：中国共产党历史的轨迹：中国共产党",
                            imgUrl:require("../../../../assets/images/timg.jpg")
                        }
                    },
                ]
            }],

        }
    }

    onRef = (ref) => {
        this.child = ref
    }

    render() {
        let {schoolLists,schoolList,nav,page,layout,type} = this.state;

        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>{type=="0"?"图书":"视频"}</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Button style={{width:50,height:50,justifyContent:"center",alignItems:"center"}} full rounded transparent onPress={()=>{
                            this.setState({
                                layout:layout=="grid"?"list":"grid"
                            })
                        }}>
                            <Icon style={{marginLeft:-1}} name={layout=="grid"?"list":"grid"} type="Feather"></Icon>
                        </Button>
                    </Right>
                </Header>
                <Tabs
                    page = {page}
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
                    style={{borderWidth:0}}
                    tabBarUnderlineStyle={{backgroundColor:"#ff2d2d",height:1}}
                    renderTabBar={()=> <ScrollableTab tabBarUnderlineStyle={{backgroundColor:"#ff2d2d",height:1}} style={{borderWidth:0}}/>}

                >
                    {
                        nav.map((item,i)=>{
                            return(
                                <Tab heading={item} key={i}
                                     tabStyle={{backgroundColor:"#ffffff",borderWidth:0}}
                                     activeTextStyle={{color:"#ff2d2d",fontWeight:"100"}}
                                     activeTabStyle={{backgroundColor:"#ffffff"}}
                                     textStyle={{color:"#808080",fontWeight:"100"}}>
                                    <View style={{padding:14,flex:1,backgroundColor:layout=="grid"?"#f0f0f0":"#ffffff"}}>
                                        <SchoolList layout={layout} type={type} page={page} onRef={this.onRef} data = {layout=="grid"?schoolLists:schoolList}></SchoolList>
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