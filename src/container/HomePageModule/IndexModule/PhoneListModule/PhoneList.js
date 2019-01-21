/**
 * Created by kurosaki on 2018/12/3.
 */

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon,Picker } from 'native-base';
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
import Swiper from 'react-native-swiper';
import PhoneListBody from './PhoneListBody'
import {HttpUtils,BASE_URL,PORT_NAME} from '../../../../components'

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
            selected:null,
            options:[]
        }
    }

    componentDidMount(){
       this.genData()
    }

    genData(){
        HttpUtils.get(BASE_URL+PORT_NAME.getAllOrgForApp).then((res)=>{
            if(res.code==0){
                this.setState({
                    options:res.data,
                    selected: res.data[0]
                })
            }else{

            }
        }).catch((error)=>{

        })
    }



    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {
        let { selected,options,isSpin } = this.state;

        let picker = ()=>{
            return(
                <Picker
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="chevron-small-left" type="Entypo" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Text style={{ color: "#fff" }}>选择组织</Text>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" style={{color:"#fff"}}/>}
                    selectedValue={selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    {
                        options.map((item,i)=>{
                            return(
                                <Picker.Item label={item.name} value={item} key={i}/>
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
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>通讯录</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        {picker()}
                    </Right>
                </Header>
                <PhoneListBody selected={selected} style={{width:width,height:height}}>
                </PhoneListBody>






            </Container>
        );
    }
}


export default PhoneList
