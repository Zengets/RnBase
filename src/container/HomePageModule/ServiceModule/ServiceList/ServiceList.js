/**
 * Created by kurosaki on 2018/11/29.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs,Toast, ScrollableTab , Button, Icon, Left, Right, Body,Title,Spinner} from 'native-base';
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
import { ServiceItem } from '../../../../components'


export default class ServiceList extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            pageIndex:1,
            hasMore:true,
            data:this.props.data,
            isSpin:true
        };
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 100
        }
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
                data.push({
                    id:Math.ceil(Math.random() * 100),
                    name:"541教育服务",
                    curnum:3,
                    totalnum:3,
                    addr:"河桥街道",
                    type:"教育服务"
                });
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
        <ServiceItem key={item.title} item={item}></ServiceItem>
    );

    _keyExtractor = (item, index) => item.id;

    render(){
        let {isSpin} = this.state;
        return (
            <View>
                {
                    isSpin?
                        <Spinner color='red'></Spinner>:
                        <FlatList
                            showsVerticalScrollIndicator = {false}
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
                }
            </View>

        );
    }
}
