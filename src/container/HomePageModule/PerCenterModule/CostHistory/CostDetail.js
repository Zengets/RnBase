/**
 * Created by kurosaki on 2018/12/18.
 */

import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs, ScrollableTab , Button, Icon, Left, Right, Body,Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    WebView,
    TouchableOpacity,
} from 'react-native';
import { timetrans } from '../../../../components'

const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
    },
    title:{
        flex:0.6,
        color:"#333",
        textAlign:"right",
        paddingRight:18
    },
    rows:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:14
    }

}


export default class CostDetail extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            curitem: {
                id:0,
                cost:4,
                timeStamp:1543995443552,
                months:"1月，2月，3月，4月",
                desc:"其他"
            }
        }
    }


    render() {
        let {curitem} = this.state;


        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>缴费详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content>
                    <View style={{alignSelf:"center",justifyContent:"center",alignItems:"center",padding:38}}>
                        <Icon style={{fontSize:68,color:"green"}} name="check-circle" type="Feather"></Icon>
                        <Text style={{fontSize:18,marginTop:8}}>
                            缴费成功
                        </Text>
                    </View>
                    <View style={styles.rows}>
                        <Text style={styles.title}>
                            缴费月份
                        </Text>
                        <Text style={{flex:1,color:"#666"}}>
                            {curitem.months}
                        </Text>
                    </View>
                    <View style={styles.rows}>
                        <Text style={styles.title}>
                            缴费金额
                        </Text>
                        <Text style={{flex:1,color:"#666"}}>
                            {curitem.cost}
                        </Text>
                    </View>
                    <View style={styles.rows}>
                        <Text style={styles.title}>
                            缴费时间
                        </Text>
                        <Text style={{flex:1,color:"#666"}}>
                            {timetrans(curitem.timeStamp)}
                        </Text>
                    </View>
                    <View style={styles.rows}>
                        <Text style={styles.title}>
                            说明
                        </Text>
                        <Text style={{flex:1,color:"#666"}}>
                            {curitem.desc}
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}