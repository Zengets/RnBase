import React from "react";
import { LargeList } from "react-native-largelist-v2";
import { Container,Item,Label, Header, Left, Body, Right, Button, Icon, SwipeRow, Content ,Picker,Textarea } from 'native-base';
import { StyleSheet, Text, View,TextInput,Dimensions,Animated } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ModalTextInput } from '../../../../components';

const { width,height } = Dimensions.get('window')



export default class CostExplain extends React.Component {
    constructor(props){
        super(props);
        this.state={
            animate: new Animated.Value(width),
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.animate,
            {
                toValue: 0,
                duration: 1000,
            }
        ).start();
    }


    render() {
        let {animate} =this.state;
        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>党费说明</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <Animated.Text style={[styles.text,{marginLeft:animate,width:width}]}>党费收缴管理制度</Animated.Text>


                </Content>
            </Container>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text:{
        fontSize:16
    }

});