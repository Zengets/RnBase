/**
 * Created by kurosaki on 2018/12/11.
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon,Content,Spinner } from 'native-base';
import {
    Linking,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Animated,
    WebView,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ServiceHistoryItem,ModalBottom,timetrans } from '../../../../components';
import { LargeList } from "react-native-largelist-v2";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";

const { width,height } = Dimensions.get('window');
const data = [{
    items:[
        {
            id:0,
            title:"医疗",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:1,
            title:"医疗1",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:2,
            title:"医疗2",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:3,
            title:"医疗3",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:4,
            title:"医疗4",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:5,
            title:"医疗5",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:6,
            title:"医疗6",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:7,
            title:"医疗7",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
        {
            id:8,
            title:"医疗8",
            service_date:1540697098961,
            content:"<p>inner html here</p>",
            actor:"猪小明"
        },
    ]
}];

const styles = {
    heads:{
        backgroundColor:"#DD5144"
    },
    container:{
        flex:1
    },
    row:{
        paddingTop:14,
        paddingBottom:14,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1
    }
}

class ServiceHistory extends Component<Props> {
    constructor(props){
        super(props);
        this._largeList=null
        this.state={
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            ifshow:false,
            pageIndex:1,//页码
            allLoaded:false,//加载state
            isSpin:true,//loading
            data:data,//mock data
            curitem:{}
        }
    }

    //did
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isSpin:false
            })
        },200)
    }



    //refresh fn
    _onRefresh = () => {
        this._largeList.beginRefresh();
        setTimeout(() => {
            this._largeList.endRefresh();
            this.state.pageIndex = 0;
            this.setState({
                data: data,
                allLoaded: this.state.pageIndex  > 5
            });
        },600);
    };
    //loading fn
    _onLoading = () => {
        this._largeList.beginLoading();
        let pageIndex = this.state.pageIndex;
        setTimeout(() => {
            this._largeList.endLoading();
            let data = [];
            for (let i = 0; i < 5; i++) {
                data.push( {
                    id:pageIndex*10+i,
                    title:"医疗"+pageIndex*10+i,
                    service_date:1540697098961,
                    content:"<p>inner html here</p>",
                    actor:"猪小明"
                });
            }
            this.setState({
                ifshow:false,
                pageIndex:pageIndex+1,
                allLoaded: pageIndex > 5,
                data:this.state.data.concat([{items:data}])
            })

        }, 600);
    };
    //render line
    _renderItem = ({ section: section, row: row }) => {
        let item = this.state.data[section].items[row]
        return(
            <ServiceHistoryItem
                key={row}
                item={item}
                onPressFn={()=>{this.setState({
                    ifshow:true,
                    curitem:item
                })}}
            ></ServiceHistoryItem>
        )
    }



    render() {
        let { isSpin,data,ifshow,curitem } = this.state,
            _it = this;

        let renderView = (item) => (
            <Grid style={{padding:14}}>
                <Row style={styles.row}>
                    <Text style={{fontSize:18,color:"#333"}}>{item.title}</Text>
                    <Text style={{fontSize:14,color:"#666"}}>{timetrans(item.service_date)}</Text>
                </Row>
                <Row style={styles.row}><Text style={{fontSize:14,color:"#999"}}>参与党员:{item.actor}</Text></Row>
                <WebView style={{width:width-28,height:168,alignSelf:"center",backgroundColor:"#f9f9f9"}} source={{ html: curitem.content, baseUrl: '' }}></WebView>
            </Grid>
        )


        return (
            <Container style={{position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>服务记录</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                {
                    isSpin?
                        <Spinner color='red'></Spinner>:
                        null
                }
                <LargeList
                    showsVerticalScrollIndicator = {false}
                    ref={ref => (this._largeList = ref)}
                    style={styles.container}
                    data={data}
                    heightForIndexPath={({ section: section, row: row }) =>{
                                    return 60
                                }}
                    renderIndexPath={this._renderItem}
                    refreshHeaderHeight={60}
                    refreshHeader={NormalHeader}
                    renderHeader={this._renderHeader}
                    onRefresh={this._onRefresh}
                    loadingFooterHeight={50}
                    loadingFooter={NormalFooter}
                    onLoading={this._onLoading}
                    allLoaded={this.state.allLoaded}
                />


                <ModalBottom show={ifshow} renderFn={()=>{
                    return renderView(curitem)
                }}></ModalBottom>

            </Container>
        );
    }
}


export default ServiceHistory
