/**
 * Created by kurosaki on 2018/12/7.
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon,Picker,Spinner } from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { data } from './DataSource'
import { NewsItem } from '../../../../components'
import { LargeList } from "react-native-largelist-v2";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";
import { withNavigation } from 'react-navigation';

const { width,height } = Dimensions.get('window')
const styles={
    container:{
        flex:1,
    },
    heads:{
        backgroundColor:"#DD5144"
    }
}
class Anti extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            pageIndex:1,//页码
            allLoaded:false,//加载state
            data:data,//this.props.data
            isSpin:true,
            scrollY:0,
            anr:new Animated.Value(-68),//reset
        }
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
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isSpin:false
            })
        },200)
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
                data: data,
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
                if(i%3==0){
                    data.push({
                        id:Math.ceil(Math.random() * 100),
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
                        id:Math.ceil(Math.random() * 100),
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
                        id:Math.ceil(Math.random() * 100),
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
                pageIndex:pageIndex+1,
                allLoaded: pageIndex > 5,
                data:this.state.data.concat([{items:data}])
            })

        }, 600);
    };

    _renderItem = ({ section: section, row: row }) => {
        let item = this.state.data[section].items[row]
        return(
            <NewsItem key={item.title} item={item} pressFn={()=>{this.props.navigation.navigate("NewsDetail",{
                id: item.id,
            })}}></NewsItem>
        )
    }




    render() {
        let { isSpin,anr,scrollY } = this.state;


        return (
            <Container style={{position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>反腐倡廉</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                {
                    isSpin?
                        <Spinner color='red'></Spinner>:
                        null
                }
                <View style={{padding:14,flex:1}}>
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
                               let item = this.state.data[section].items[row]
                               if(item.pic.length>1){
                                    return 160
                               }else{
                                    return 108
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
                </View>

                <Animated.View  style={{height:50,width:50,position:"absolute",bottom:anr,right:30}}>
                    <Button full rounded style={{height:50,width:50,justifyContent:"center",alignItems:"center",backgroundColor:"#34A34F"}} onPress={()=>{this._largeList.scrollTo({x:0,y:0});}}>
                        <Icon  type="Entypo" name="align-top" style={{color:"#fff",marginLeft:12}}></Icon>
                    </Button>
                </Animated.View>





            </Container>
        );
    }
}


export default withNavigation(Anti)
