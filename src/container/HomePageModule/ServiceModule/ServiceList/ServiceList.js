/**
 * Created by kurosaki on 2018/11/29.
 *
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
} from 'react-native';
import { ServiceItem,HttpUtils,BASE_URL,PORT_NAME } from '../../../../components'
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
            type:this.props.type,//props.type
            data:[],//this.props.data
            isSpin:true
        };
    }

    componentWillMount(){
        this.setState({
            isSpin:true
        })
    }

    genData(key){
        let {type} = this.props,
            {pageIndex}=this.state;
        HttpUtils.get(BASE_URL+PORT_NAME.queryManageListForApp+`?${type?"typeId="+type:null}&page=${pageIndex}&size=${6}`).then((res)=>{
            console.log(res)
            let data = [{items:res.data}]
            this.setState({
                isSpin:false,
                allLoaded:res.data.length==0,
                data:this.state.data.concat(data)
            },()=>{
                if(key=="refresh"){
                    this._largeList.endRefresh();
                }else{
                    this._largeList.endLoading();
                }
            })

        }).catch((e)=>{})
    }


    componentDidMount(){
        this.genData()
        this.props.onRef(this)
    }
    componentWillReceiveProps(nextprops){
        if(this.props.page !== nextprops.page){
            this.props.onRef(this)
        }
    }
    _onRefresh = () => {
        this._largeList.beginRefresh();
        this.setState({
            pageIndex:1,
        });
        setTimeout(() => {
            this.genData("fresh");
        }, 10);
    };


    _onLoading = () => {
        this._largeList.beginLoading();
        let pageIndex = this.state.pageIndex;
        this.setState({
            pageIndex:pageIndex+1,
        })
        setTimeout(() => {
            this.genData("load")
        }, 10);
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