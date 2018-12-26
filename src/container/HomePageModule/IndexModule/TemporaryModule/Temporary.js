/**
 * Created by kurosaki on 2018/12/7.
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
    TextInput
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TemporaryItem } from '../../../../components';
import { data } from './DataSource';
import { LargeList } from "react-native-largelist-v2";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";

const { width,height } = Dimensions.get('window')
const styles = {
    heads:{
        backgroundColor:"#DD5144"
    },
    container:{
        flex:1
    },
    search:{
        paddingLeft:12,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1
    },
}

class Temporary extends Component<Props> {
    constructor(props){
        super(props);
        this._largeList=null
        this.state={
            str:"",//关键词
            pageIndex:1,//页码
            allLoaded:false,//加载state
            isSpin:true,//loading
            data:data//mock data
        }
    }
    //拨打电话
    linking(url){
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {

            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    //did
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isSpin:false
            })
        },200)
    }

    genData(str){
        alert(str)
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
                data.push({
                    "temppartyId": 1,
                    "temppartyName": "余林社区临时党组织2",
                    "temppartyTheme": "两学一做学习2",
                    "telephone": "13082577979",
                    "workContent": "两学一做学习2",
                    "fstusrId": pageIndex*10+i,
                    "fstusrDtm": 1540697098961,
                    "lstusrId": 1004,
                    "lstusrDtm": 1542786718504,
                    "validSta": "0",
                    "isDelete": "0",
                    "orgSeq": null,
                    "exta": null,
                    "extb": null,
                });
            }
            this.setState({
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
            <TemporaryItem
                key={row}
                item={item}
                pressFn={()=>{this.linking("tel:"+item.telephone)}}
                onPressFn={()=>{this.toDetail(item.fstusrId)}}
            ></TemporaryItem>
        )
    }
    _renderHeader = () => {
        return (
            <TextInput
                ref={ref => (this.comment = ref)}
                value={this.state.str}
                onChangeText={(str) => this.setState({str})}
                style={styles.search}
                placeholder="请输入关键词搜索..."
                onSubmitEditing={()=>{this.genData(this.state.str)}}
                returnKeyType="done"
            />
        );
    };


    //jump to detail
    toDetail(ids){
        this.props.navigation.navigate('TemporaryDetail', {
            id: ids,
        });

    }

    render() {
        let { isSpin,data } = this.state,
            _it = this;


        return (
            <Container style={{position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>临时党组织</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Button rounded full transparent style={{backgroundColor: '#DD5144',width:50,height:50}} onPress={()=>{
                        _it._largeList.scrollTo({ x: 0, y: 0 });
                        setTimeout(()=>{
                            _it.comment.focus();
                        },600)
                        }}>
                            <Icon name="search"/>
                        </Button>
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
                                    return 92
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




            </Container>
        );
    }
}


export default Temporary
