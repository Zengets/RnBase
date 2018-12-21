/**
 * Created by kurosaki on 2018/12/10.
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
    TouchableNativeFeedback
} from 'react-native';
import ActivityList from './ActivityList'



const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex: 1
    },

}

export default class Activity extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            index:props.navigation.getParam('index', 'NO-ID'),
            tabs:["两学一做","三会一课","主题活动","我的活动"],
            activityList:[
                {
                    items:[
                        {
                            "end": true,
                            "imgUrl": null,
                            "countClick": 3,
                            "actId": 60,
                            "location": "南京江宁",
                            "title": "余林社区居民参加妇女维权讲座",
                            "userName": "杭华",
                            "bgtime": 1536886800000
                        }, {
                            "end": false,
                            "countClick": 1,
                            "actId": 59,
                            "location": "南京江宁",
                            "title": "余林社区召开社区建设会议",
                            "userName": "杭华",
                            "bgtime": 1536627600000
                        }, {
                            "end": false,
                            "imgUrl": null,
                            "countClick": 1,
                            "actId": 65,
                            "location": "南京江宁",
                            "title": "桃源支部召开支部党员大会",
                            "userName": "杭华",
                            "bgtime": 1535504400000
                        }, {
                            "end": false,
                            "imgUrl": null,
                            "countClick": 1,
                            "actId": 64,
                            "location": "南京江宁",
                            "title": "余林社区举办残疾预防日知识讲座",
                            "userName": "杭华",
                            "bgtime": 1534726800000
                        }, {
                            "end": true,
                            "imgUrl": null,
                            "countClick": 3,
                            "actId": 63,
                            "location": "南京江宁",
                            "title": "余林社区召开两委会",
                            "userName": "杭华",
                            "bgtime": 1533535200000
                        }


                    ]
                }
            ]
        }
        //this.child._scrollToIndex();
    }


    onRef = (ref) => {
        this.child = ref
    }


    render() {
        let {activityList,tabs,index} = this.state;
        let is = parseInt(index)
        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>{tabs[is]}</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <View style={{paddingLeft:14,flex:1,paddingRight:14}}>
                    <ActivityList onRef={this.onRef} data={activityList}></ActivityList>
                </View>


            </Container>
        );
    }
}