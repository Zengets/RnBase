/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, H1, H2, H3,Fab, Button, Icon, Left, Right, Body,Title,Drawer} from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import PerCenter from '../PerCenterModule/PerCenter'
const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex: 1
    },
    wrapper: {
        width:width,
        height:200,
        paddingBottom:32,

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    },
    icongroup:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        borderTopColor:"#f0f0f0",
        borderTopWidth:10,
        flexWrap:"wrap",
        borderBottomColor:"#eeeff0",
        borderBottomWidth:10
    },
    item:{
        width:0.25*width,
        height:0.25*width,
        justifyContent:"center",
        alignItems:"center"
    },
    imagehead:{
        width:36,
        height:36,
        borderRadius:600,
        overflow:"hidden"
    }

}
export default class News extends Component<Props> {
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    render() {
        return (
        <Container>
            <Header style={{paddingTop:20,height:68,backgroundColor:"#DD5144"}}>
                <Left style={{flex:1}}>
                    <TouchableOpacity onPress={this.openDrawer} style={styles.imagehead}>
                        <ImageBackground
                            style={{width:36,height:36}}
                            source={require('../../../assets/images/headtemp.jpg')}
                            resizeMode='cover'>
                        </ImageBackground>
                    </TouchableOpacity>

                </Left>
                <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#fff",fontSize:20}}>新闻</Text>
                </Body>
                <Right style={{flex:1}}>
                    <Button transparent>
                        <Icon name="ios-qr-scanner" />
                    </Button>
                </Right>
            </Header>
            <Text>
            News
            </Text>
        </Container>
        );
    }
}