/**
 * Created by kurosaki on 2018/12/13.
 */
import React, { Component } from 'react';
import { Container, Header,Content, Left, Body, Right, Button, Icon,Picker,ListItem } from 'native-base';
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
import {timetrans} from '../../../../components'

const { width,height } = Dimensions.get('window')
const styles={
    heads:{
        backgroundColor:"#DD5144"
    },
    titles:{
        fontSize:18,
        color:"#DD5144"
    },
    body:{
        fontSize:14,
        color:"#666666"
    },
    bodys:{
        fontSize:16,
        color:"#666666"
    }
}
class SchoolBook extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            title:props.navigation.getParam('title', 'NO-ID'),//gentitle
            endDate: 1546219777637,
            testArr:[],

        }
    }

    componentDidMount(){

    }
    render() {
        let { testArr,title } = this.state;


        return (
            <Container style={{position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>图书详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content>
                <Text>
                    {title}
                </Text>

                </Content>

            </Container>
        );
    }
}


export default SchoolBook
