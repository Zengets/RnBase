/**
 * Created by kurosaki on 2018/12/3.
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
    TouchableNativeFeedback
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Swiper from '@nart/react-native-swiper';
import PhoneListBody from './PhoneListBody'

const { width,height } = Dimensions.get('window')
const styles={
    heads:{
        backgroundColor:"#DD5144"
    }
}
class PhoneList extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            isSpin:true,
            selected: "蓝湾国际党支部",
            testArr:[],
            options:["蓝湾国际党支部","扬州党支部","蓝湾国际党支部","扬州党支部","蓝湾国际党支部","扬州党支部","蓝湾国际党支部","扬州党支部","蓝湾国际党支部","扬州党支部","蓝湾国际党支部","扬州党支部","蓝湾国际党支部","扬州党支部","蓝湾国际党支部","扬州党支部"]
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isSpin:false
            })
        },200)
    }
    onValueChange(value: string) {
        let arr1=[{
            exam:"试卷1",
            time:"2017-08-01",
        },{
            exam:"试卷2",
            time:"2017-08-01",
        },{
            exam:"试卷3",
            time:"2017-08-01",
        },{
            exam:"试卷4",
            time:"2017-08-01",
        },{
            exam:"试卷5",
            time:"2017-08-01",
        },],arr2=[{
            exam:"试卷1",
            time:"2017-09-01",
        },{
            exam:"试卷2",
            time:"2017-09-01",
        },{
            exam:"试卷3",
            time:"2017-09-01",
        },{
            exam:"试卷4",
            time:"2017-09-01",
        },{
            exam:"试卷5",
            time:"2017-09-01",
        },]

        this.setState({
            selected: value,
            testArr:value=="待考"?arr1:arr2
        });
    }
    render() {
        let { selected,testArr,options,isSpin } = this.state;

        let picker = ()=>{
            return(
                <Picker
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>选择组织</Title>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" style={{color:"#fff"}}/>}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    {
                        options.map((item,i)=>{
                            return(
                                <Picker.Item label={item} value={item} key={i}/>
                            )
                        })
                    }
                </Picker>)
        }

        return (
            <Container>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>通讯录</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        {picker()}
                    </Right>
                </Header>
                {
                    isSpin?
                        <Spinner color='red'></Spinner>:
                    null
                }
                <PhoneListBody style={{width:width,height:height}}>
                </PhoneListBody>






            </Container>
        );
    }
}


export default PhoneList
