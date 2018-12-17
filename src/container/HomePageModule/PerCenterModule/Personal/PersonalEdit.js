/**
 * Created by kurosaki on 2018/12/17.
 */

import React, { Component } from 'react';
import {  Container, Header, Content, Item,Label , Button, Icon, Left, Right, Body,Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Animated,
    ScrollView,
    WebView,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import {timetrans,MyUtil} from '../../../../components'

const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
    },
    map:{
        width:width,
        height:(height-180)*0.55
    },
    customInfoWindow: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#DD5144',
        marginBottom: 5,
    },
    srcollView:{
        flex:1,
        padding:14,
    },
    rows:{
        paddingBottom:14,
        flexDirection:"row",
        width:width-28,
        justifyContent:"space-between",
        alignItems:"flex-start"
    },
    titled:{
        fontSize:16,
        color:"#333",
        width:88
    },
    cons:{
        fontSize:14,
        color:"#666",
        flex:1,
        textAlign:"right"
    }

}


export default class PersonalEdit extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            formvalue:{
                name:"",
                phone:"",
                address:"",
                community:"",
                things:""
            }
        }


    }

    componentDidMount(){

    }

    render() {
        let {formvalue,center} = this.state;


        return (
            <Container style={{flex:1,position:"relative"}}>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>填写预约信息</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <ScrollView style={{flex:1}}>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>姓名</Label>
                                <Input
                                    onChangeText={(name) => this.setState({
                                    formvalue:{ ...formvalue, name: name }
                                })}
                                    value={formvalue.name}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>电话</Label>
                                <Input
                                    onChangeText={(phone) => this.setState({
                                    formvalue:{ ...formvalue, phone: phone }
                                })}
                                    value={formvalue.phone}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>联系地址</Label>
                                <Input
                                    onChangeText={(address) => this.setState({
                                    formvalue:{ ...formvalue, address: address }
                                })}
                                    value={formvalue.address}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>所属社区</Label>
                                <Input
                                    onChangeText={(community) => this.setState({
                                    formvalue:{ ...formvalue, community: community }
                                })}
                                    value={formvalue.community}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:32}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>申请事项</Label>
                                <Input
                                    multiline = {true}
                                    onChangeText={(things) => this.setState({
                                    formvalue:{ ...formvalue, things: things }
                                })}
                                    value={formvalue.things}
                                    clearButtonMode="always"
                                />

                            </Item>
                        </Row>
                        <Button full danger style={{width:width-28,justifyContent:"center",alignItems:"center",marginBottom:68}} onPress={()=>{
                        alert(JSON.stringify(formvalue))
                    }}>
                            <Text style={{color:"#fff",fontSize:16}}>预约</Text>
                        </Button>
                    </ScrollView>
                </Content>




            </Container>

        );
    }
}