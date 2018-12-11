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
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { ServiceItem } from '../../../../components'
import { LargeList } from "react-native-largelist-v2";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";
import { withNavigation } from 'react-navigation';


const { width,height } = Dimensions.get('window')
let styles = {
    container:{
        flex:1,
    }
}

class ServiceList extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            pageIndex:1,//页码
            allLoaded:false,//加载state
            data:this.props.data,//this.props.data
            isSpin:true
        };
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
    componentWillReceiveProps(nextprops){
        if(this.props.page !== nextprops.page){
            this.props.onRef(this)
        }
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
                    id:Math.ceil(Math.random() * 100),
                    name:"541教育服务",
                    curnum:3,
                    totalnum:3,
                    addr:"河桥街道",
                    type:"教育服务"
                });
            }
            this.setState({
                pageIndex:pageIndex+1,
                allLoaded: pageIndex > 5,
                data:this.state.data.concat([{items:data}])
            })

        }, 600);
    };





    _renderItem = ({ section: section, row: row }) => {
        let item = this.state.data[section].items[row]
        return(
            <ServiceItem key={row} item={item} pressFn={()=>{this.props.navigation.navigate("ServiceDetail",{
                id: item.id,
            })}}></ServiceItem>
        )
    }


    _scrollToIndex = () => {
        this._largeList.scrollTo({ x: 0, y: 0 });
    }

    render(){
        let {isSpin} = this.state;
        return (
            <View style={{flex:1}}>
                {
                    isSpin?
                        <Spinner color='red'></Spinner>:
                        <LargeList
                            showsVerticalScrollIndicator = {false}
                            ref={ref => (this._largeList = ref)}
                            style={styles.container}
                            data={this.state.data}
                            heightForIndexPath={({ section: section, row: row }) =>{
                                return 94
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
            </View>

        );
    }
}

export default withNavigation(ServiceList)