/**
 * Created by kurosaki on 2018/12/5.
 */
import React from "react";
import { LargeList } from "react-native-largelist-v2";
import { Container,Item,Label, Header, Left, Body, Right, Button, Icon, Thumbnail, Content ,Picker,Textarea,ListItem } from 'native-base';
import { StyleSheet, Image,Text, View,TextInput,Dimensions,Animated } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ModalTextInput } from '../../../../components';

const { width,height } = Dimensions.get('window')



export default class CostSure extends React.Component {
    constructor(props){
        super(props);
        this.state={
            animate: new Animated.Value(width),
            fee:props.navigation.getParam('total', 'NO-ID'),
            months:props.navigation.getParam('months', 'NO-ID'),
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
        let {animate,fee,months} =this.state;
        return (
            <Container style={{flex:1,position:"relative"}}>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>党费说明</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <Grid>
                        <Col size={1}>
                            <Thumbnail source={require("../../../../assets/images/logos.png")} />
                        </Col>
                        <Col size={4} style={{justifyContent:"center"}}>
                            <Text style={{marginTop:8,color:"#DD5144",fontSize:16}}>合计：￥{fee}</Text>
                            <Text style={{marginTop:6,fontSize:14}} note>明细：{months}</Text>
                        </Col>
                    </Grid>
                    <Grid style={{alignItems:"center",borderTopColor:"#f0f0f0",borderTopWidth:6,marginTop:12,padding:6,borderBottomColor:"#f0f0f0",borderBottomWidth:6}}>
                        <Col style={{width:48}}>
                            <Image style={{width:32,height:32}} source={require("../../../../assets/images/alipay.png")}></Image>
                        </Col>
                        <Col>
                        <Text>支付宝</Text>
                        </Col>
                        <Col style={{alignItems:"flex-end"}}>
                            <Image style={{width:30,height:30}} source={require("../../../../assets/images/radio-active.png")}></Image>
                        </Col>
                    </Grid>
                </Content>
                <View style={styles.footer}>
                   <Text style={{color:"#fff"}}>支付宝支付￥{fee}</Text>
                </View>
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
    },
    footer:{
        position:"absolute",
        bottom:0,
        height:54,
        width:width,
        backgroundColor:"#DD5144",
        justifyContent:"center",
        alignItems:"center"
    },

});