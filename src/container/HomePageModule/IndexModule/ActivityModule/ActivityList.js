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
import { ActivityItem } from '../../../../components'
import { LargeList } from "react-native-largelist-v2";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";
import { withNavigation } from 'react-navigation';

let styles = {
    container:{
        flex:1,
    }
}

const { width,height } = Dimensions.get('window')

class ActivityList extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            pageIndex:1,//页码
            scrollY:0,
            allLoaded:false,//加载state
            data:this.props.data,//this.props.data
            isSpin:true,
            anr:new Animated.Value(-68),//reset
        };
        this.insider =  Animated.timing(
            this.state.anr,
            {
                toValue: 65,
                duration: 800,
            }
        )
        this.outsider =  Animated.timing(
            this.state.anr,
            {
                toValue: -68,
                duration: 800,
            }
        )
    }
    componentWillMount(){
        this.setState({
            isSpin:true
        })
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isSpin:false
            })
        },400)
        this.props.onRef(this)
    }


    _onRefresh = () => {
        this._largeList.beginRefresh();
        setTimeout(() => {
            this._largeList.endRefresh();
            this.state.pageIndex = 0;
            this.setState({
                data: this.props.data,
                allLoaded: this.state.pageIndex  > 5
            });
        }, 600);
    };

    _onLoading = () => {
        this._largeList.beginLoading();
        let pageIndex = this.state.pageIndex;
        setTimeout(() => {
            this._largeList.endLoading();
            let data = [];
            for (let i = 0; i < 5; i++) {
                data.push({
                    "end": true,
                    "imgUrl": null,
                    "countClick": pageIndex*10+i,
                    "actId": 60,
                    "location": "南京江宁",
                    "title": "余林社区居民参加妇女维权讲座",
                    "userName": "杭华",
                    "bgtime": 1536886800000
                });
            }


            this.setState({
                pageIndex:pageIndex+1,
                allLoaded: pageIndex > 5,
                data:this.state.data.concat([{items:data}])
            })

        }, 600);
    };


    _jumpUrl (item){
        this.props.navigation.navigate("ActivityDetail",{
            id: item.actId,
        })
    }


    _renderItem = ({ section: section, row: row }) => {
        let item = this.state.data[section].items[row];
        return(
            <ActivityItem key={item.title} item={item} onPressFn={()=>{this._jumpUrl(item)}}></ActivityItem>
        )}


    _scrollToIndex = () => {
        this._largeList.scrollTo({x:0,y:0});
    }



    render(){
        let {isSpin,anr,scrollY} = this.state;
        return (
            <View style={{flex:1}}>
                {
                    isSpin?
                        <Spinner color='red'></Spinner>:
                        <LargeList
                            onScroll={({x:x,y:y})=>{
                            if(y>height && scrollY<height){
                                this.insider.start();
                                this.setState({
                                    scrollY:y
                                })
                            }else if(y<height && scrollY>height){
                               this.outsider.start();
                               this.setState({
                                    scrollY:y
                                })
                            }
                        } }
                            showsVerticalScrollIndicator = {false}
                            ref={ref => (this._largeList = ref)}
                            style={styles.container}
                            data={this.state.data}
                            heightForIndexPath={({ section: section, row: row }) =>{
                                return 215
                            }}
                            renderIndexPath={this._renderItem}
                            refreshHeaderHeight={60}
                            refreshHeader={NormalHeader}
                            onRefresh={this._onRefresh}
                            loadingFooterHeight={50}
                            loadingFooter={NormalFooter}
                            onLoading={this._onLoading}
                            allLoaded={this.state.allLoaded}
                        />

                }
                <Animated.View  style={{height:50,width:50,position:"absolute",bottom:anr,right:30}}>
                    <Button full rounded style={{height:50,width:50,justifyContent:"center",alignItems:"center",backgroundColor:"#34A34F"}} onPress={()=>{this._largeList.scrollTo({x:0,y:0});}}>
                        <Icon  type="Entypo" name="align-top" style={{color:"#fff",marginLeft:12}}></Icon>
                    </Button>
                </Animated.View>
            </View>

        );
    }
}

export default withNavigation(ActivityList)