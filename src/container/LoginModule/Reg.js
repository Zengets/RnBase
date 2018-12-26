/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import { Container, Header, View, Item, Input, Label,Button, Icon, Left, Body, Title,Right,Toast } from 'native-base';
import {connect} from 'react-redux';
import {
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Text,
    StatusBar
} from 'react-native';
import { HttpUtils,BASE_URL,PORT_NAME } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


let {height,width} =  Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        display:"flex",
        width:width,
        height:height,
        overflow:"hidden",
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor: "transparent"
    },
    forms:{
        display:"flex",
        width:0.94*width,
        height:380,
        marginBottom:64,
        alignItems:"center",
    },
    remember:{
        width:0.80*width,
        marginTop:18,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
});

class Reg extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            remember:props.remember
        };
    }

    componentDidMount() {
        setTimeout(()=>{
            StatusBar.setBackgroundColor('rgba(0,0,0,0)')
        },300)
    }

    _onPressSubmit = ()=>{
        let {username,password,remember} = this.state;
        //this.props.navigation.navigate('Main');
        if(username==""||password==""){
            Toast.show({
                text: "用户名/密码/确认密码不可为空...!",
                buttonText: "确认",
                duration: 1400
            })
            return
        }
        this.props.navigation.navigate('Main');

        HttpUtils.post(BASE_URL+PORT_NAME.login,{
            userIdcard:username,
            pwd:password
        }).then((res) => {
            if(res.code==0){
                AsyncStorage.setItem('userIdcard',username);
                AsyncStorage.setItem('pwd',password);
                this.props.navigation.navigate('Main');
                // this.props.navigation.goBack();
            }else{
                Toast.show({
                    text: res.message,
                    buttonText: "确认",
                    duration: 1400
                })
            }

        }).catch((error)=>{
            Toast.show({
                text: error,
                buttonText: "确认",
                duration: 1400
            })

        })


    }

    componentWillUnmount() {
        this.props.onSwitchRem(this.state.remember)
    }

    render() {
        let {username,password,remember} = this.state;
        return (

                <KeyboardAwareScrollView
                    innerRef={ref => {this.scroll = ref}}
                    scrollEnabled = {false}
                    onKeyboardWillShow={(frames: Object)=>{
             }}>
                    <ImageBackground
                        style={styles.container}
                        source={require('../../assets/images/loginbacs.png')}
                        resizeMode='cover'>
                        <Container style={{flex:1,backgroundColor: "transparent"}}>
                        <Header transparent style={styles.heads}>
                            <Left style={{flex:1}}>
                                <Button transparent  onPress={()=>{this.props.navigation.goBack()}}>
                                    <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                                </Button>
                            </Left>
                            <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{color:"#fff",fontSize:20}}>注册</Text>
                            </Body>
                            <Right style={{flex:1}}>

                            </Right>
                        </Header>
                        <View style={{backgroundColor:"transparent",width:width,height:height-28,justifyContent:"flex-end",alignItems:"center",paddingBottom:92}}>
                            <ImageBackground
                                style={styles.forms}
                                source={require('../../assets/images/loginlands.png')}
                                resizeMode='contain'>
                                <View style={{marginTop:84,width:width*0.8}}>
                                    <Item floatingLabel>
                                        <Label>姓名</Label>
                                        <Input
                                            onChangeText={(username) => this.setState({username})}
                                            value={username}
                                            clearButtonMode="always"
                                        />
                                    </Item>
                                    <Item style={{marginTop:18}} floatingLabel>
                                        <Label>密码</Label>
                                        <Input
                                            secureTextEntry={true}
                                            onChangeText={(password) => this.setState({password})}
                                            value={password}
                                            clearButtonMode="always"
                                        />
                                    </Item>
                                    <Item style={{marginTop:18}} floatingLabel>
                                        <Label>手机号</Label>
                                        <Input
                                            onChangeText={(password) => this.setState({password})}
                                            value={password}
                                            clearButtonMode="always"
                                        />
                                    </Item>

                                    <View style={styles.remember}>
                                        <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                                            <Text>
                                                若已有账号您可以 >
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{color:"#ff0000"}} onPress={()=>{
                                            this.props.navigation.navigate('Login');
                                        }}>
                                                立即登陆
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Button full style={{marginTop:32}} rounded danger>
                                            <Text style={{color:"#fff",fontSize:16}}>注 册</Text>
                                        </Button>
                                    </View>


                                </View>
                            </ImageBackground>
                            <Text style={{fontSize:14,fontWeight:"normal",color:"#666"}}>
                                注册即表示同意 <Text style={{fontSize:14,fontWeight:"normal",color:"#999"}}>“服务条款和隐私条款”</Text>
                            </Text>
                        </View>
                        </Container>
                    </ImageBackground>
                </KeyboardAwareScrollView>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        remember: state.remember,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        onSwitchRem: (key) => {
            dispatch({type:'CHANGE_REM',remember:key})
        }
    }
}
Reg = connect(mapStateToProps,mapDispatchToProps)(Reg)

export default Reg