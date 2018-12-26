/**
 * Created by kurosaki on 2018/12/20.
 */


import React, { Component } from 'react';
import {  Container, Header, Content, Card, ListItem , Form, Item,Button,Label,Input, Icon, Left, Right, Body,Switch} from 'native-base';
import {
    Text,
    View,
    Image,
    Animated,
    ImageBackground,
    Dimensions,
    FlatList,
    StatusBar,
    WebView,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { timetrans,ModalBottom } from '../../../../components'
const { width,height } = Dimensions.get('window')


let styles = {
    container:{
        flex:1,
    },
    titles:{
        padding:14,
        borderBottomColor:"#ddd",
        borderBottomWidth:0.5,
        fontSize:16
    },
    fillcon:{
        height:300,
        backgroundColor:"#f0f0f0",
        width:width,
        flexDirection:"column",
        justifyContent:"space-between"
    }
}



export default class Setting extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            index:props.navigation.getParam('id', 'NO-ID'),
            voice:false,
            shake:false,
            ifshow:false,
            password:null,
            newpassword:null,
            curitem:{
                id:4,
                name:"消息5",
                timeStamp:1543995443552,
                content:"<p>this is a news content</p>"
            }
        }
        //this.child._scrollToIndex();
    }

    updateApp(){
        ToastAndroid.show("您已安装最新版本...",ToastAndroid.SHORT);
    }



    render() {
        let { curitem,voice,shake,ifshow,newpassword,password } = this.state;
        let renderForm = ()=>{
            return (
                <View style={styles.fillcon}>
                    <Form style={{flex:1,paddingTop:22}}>
                        <Item floatingLabel style={{marginTop:14,marginBottom:14}}>
                            <Label>请输入新密码</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({password})}
                                value={password}
                                clearButtonMode="always"
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>确认新密码</Label>
                            <Input
                                onBlur={()=>{
                                    if(password!=newpassword){
                                        ToastAndroid.show("您两次输入的密码不一致...",ToastAndroid.SHORT);
                                    }
                                }}
                                secureTextEntry={true}
                                onChangeText={(newpassword) => this.setState({newpassword})}
                                value={newpassword}
                                clearButtonMode="always"
                            />
                        </Item>
                    </Form>
                    <Button full danger onPress={()=>{
                         if(password!=newpassword){
                            ToastAndroid.show("您两次输入的密码不一致...",ToastAndroid.SHORT);
                         }else{
                            this.setState({
                                ifshow:false
                            });

                            ToastAndroid.show("修改成功,您的新密码为"+newpassword+",请重新登录..",ToastAndroid.SHORT);
                            this.props.navigation.navigate("Login")
                         }
                    }}>
                        <Text style={{fontSize:16,color:"#fff"}}>修改密码</Text>
                    </Button>
                </View>

            )
        }
        return (
            <Container style={{flex:1,backgroundColor:"#f0f0f0"}}>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#fff",fontSize:20}}>设置</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <Card style={{flex:1}}>
                        <Text style={[styles.titles,{color:"#007eff"}]}>系统设置</Text>
                        <ListItem  style={{flex:1}} onPress={()=>{
                            this.updateApp()
                        }}>
                            <Icon active style={{color:"#007eff"}} name="cycle" type="Entypo"/>
                            <Text> 检查更新</Text>
                            <Right style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                                <Text>v1.0.0 </Text>
                                <Icon style={{color:"#007eff"}} name="chevron-small-right" type="Entypo"/>
                            </Right>
                        </ListItem >
                        <ListItem  style={{flex:1}}>
                            <Icon active style={{color:"#007eff"}} name="bell" type="Entypo"/>
                            <Text> 声音提醒</Text>
                            <Right style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                                <Switch onValueChange={(key)=>{
                                    this.setState({
                                        voice:key,
                                        ifshow:false
                                    })
                                }} value={voice} />
                            </Right>
                        </ListItem >
                        <ListItem  style={{flex:1}}>
                            <Icon active style={{color:"#007eff"}} name="colours" type="Entypo"/>
                            <Text> 震动提醒</Text>
                            <Right style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                                <Switch onValueChange={(key)=>{
                                    this.setState({
                                        shake:key,
                                        ifshow:false
                                    })
                                }} value={shake} />
                            </Right>
                        </ListItem >
                    </Card>
                    <Card style={{flex:1}}>
                        <Text style={[styles.titles,{color:"#DD5144"}]}>账号设置</Text>
                        <ListItem  style={{flex:1}} onPress={()=>{
                            this.setState({
                                ifshow:true
                            })
                        }}>
                            <Icon active style={{color:"#DD5144"}} name="edit" type="Feather"/>
                            <Text> 修改密码</Text>
                            <Right style={{flex:1}}>
                                <Icon style={{color:"#DD5144"}} name="chevron-small-right" type="Entypo" />
                            </Right>
                        </ListItem >
                    </Card>

                </Content>
                <ModalBottom show={ifshow} renderFn={()=>{
                    return renderForm()
                }}></ModalBottom>

            </Container>
        );
    }
}






































































































































































