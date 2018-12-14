/**
 * Created by kurosaki on 2018/12/12.
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
import { SchoolListItem } from '../../../../components'
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

class SchoolList extends React.PureComponent {
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
        if(this.props.data !== nextprops.data){
            this.setState({
                data:nextprops.data
            })
            this._onRefresh();
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
            for (let i = 0; i < 6; i++) {
                let layout = this.props.layout;
                let dataes = layout=="list"?
                {
                        id:Math.ceil(Math.random() * 100),
                        name:"中国共产党人物转",
                        desc:"中国共产党人物转中国共产党人物转中国共产党人物转中国共产党人物转",
                        imgUrl:require("../../../../assets/images/timg1.jpg")
                    }: {
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
                    }


                data.push(dataes);
            }
            this.setState({
                pageIndex:pageIndex+1,
                allLoaded: pageIndex > 5,
                data:this.state.data.concat([{items:data}])
            })

        }, 600);
    };

    _jumpUrl(type,id,title){
        type==0?
        this.props.navigation.navigate("SchoolBook",{
            id: id,
            title:title
        }):
        this.props.navigation.navigate("SchoolVideo",{
            id: id,
            title:title
        })
    }



    _renderItem = ({ section: section, row: row }) => {
        let item = this.state.data[section].items[row],type = this.props.type,layout = this.props.layout;
        return(
            layout=="list"?
            <SchoolListItem layout={layout} key={row} item={item} pressFn={(id,title)=>this._jumpUrl(type,id,title)}>
            </SchoolListItem>:
            <View key={row} style={{flex:1,flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <SchoolListItem layout={layout} item={item.rendera} pressFn={(id,title)=>this._jumpUrl(type,id,title)}>
                </SchoolListItem>
                <SchoolListItem layout={layout} item={item.renderb} pressFn={(id,title)=>this._jumpUrl(type,id,title)}>
                </SchoolListItem>
            </View>

        )
    }


    _scrollToIndex = () => {
        this._largeList.scrollTo({ x: 0, y: 0 });
    }

    render(){
        let {isSpin} = this.state,layout = this.props.layout;
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
                                if(layout=="list"){
                                    return 130
                                }else{
                                    return width*0.5+88
                                }

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

export default withNavigation(SchoolList)