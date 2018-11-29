/**
 * Created by kurosaki on 2018/11/29.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs,Toast, ScrollableTab , Button, Icon, Left, Right, Body,Title} from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { NewsItem } from '../../../../components'


export default class NewsList  extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            pageIndex:1,
            hasMore:true,
            data:this.props.data
        };
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 100
        }
    }
    _onRefresh =()=> {
        Toast.show({
            text: "刷新成功!",
            buttonText: "确认",
            type: "success",
            duration: 3000
        })
        let data = [];
        this.setState({
            refreshing: false,
            pageIndex:1,
            hasMore:true,
            data:data
        })

    }
    //load
    _onEndReached = () =>{
        let pageIndex = this.state.pageIndex;
        if(pageIndex<5){
            pageIndex++;
            let data = this.props.data;
            for (let i = 0; i < 5; i++) {
                if(i%3==0){
                    data.push({
                        title:"习近平致丝路沿线民间组织论坛贺信",
                        from:"人民网",
                        time:"2018-10-26",
                        pic:[
                            {
                                img:require("../../../../assets/images/tts1.png")
                            }
                        ]});
                }else if(i%3==1){
                    data.push({
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

                        ]});
                }else{
                    data.push({
                        title:"中国这5年：加强党对意识形态的领导",
                        from:"人民网",
                        time:"2018-10-26",
                        pic:[
                            {
                                img:require("../../../../assets/images/tts0.png")
                            }
                        ]});
                }
            }
            this.setState({
                refreshing: false,
                pageIndex:pageIndex,
                hasMore:pageIndex<5,
                data:this.state.data.concat(data)
            })
        }else{
            this.setState({
                hasMore:false
            })
        }
    }

    _footer = () => {
        return <Text style={{ backgroundColor: 'transparent',padding:12,textAlign:"center" }}>{this.state.hasMore?"玩命加载中...":"我也是有底线的!"}</Text>;
    }

    //separator line
    _separator = () => {
        return <View style={{ height: 8, backgroundColor: 'transparent' }}/>;
    }

    _renderItem = ({item}) => (
        <NewsItem key={item.title} item={item}></NewsItem>
    );

    _keyExtractor = (item, index) => item.id;

    render(){
        return (
            <FlatList
                keyExtractor={this._keyExtractor}
                viewabilityConfig = {this.viewabilityConfig}
                ref={(flatList) => this._flatList = flatList}
                ListFooterComponent={this._footer}
                ItemSeparatorComponent={this._separator}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                onEndReachedThreshold={0.1}
                data={this.props.data}
                renderItem={this._renderItem}
                onEndReached={this._onEndReached}
            />
        );
    }
}
