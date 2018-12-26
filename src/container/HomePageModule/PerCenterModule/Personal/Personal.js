/**
 * Created by kurosaki on 2018/12/17.
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button,Content, Icon,Picker,List,ListItem,SwipeRow,ActionSheet } from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    NativeModules
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ModalTextInput } from '../../../../components'



var ImagePicker = NativeModules.ImageCropPicker;

var BUTTONS = [
    { text: "拍照", icon: "eye", iconColor: "#2c8ef4" },
    { text: "从相册选择", icon: "analytics", iconColor: "#f42ced" },
    { text: "清除已选照片", icon: "trash", iconColor: "#ea943b" },
    { text: "取消", icon: "close", iconColor: "#ff2100" }
]

var CANCEL_INDEX = 3;


const { width,height } = Dimensions.get('window')
const styles={
    heads:{
        backgroundColor:"#DD5144"
    },
    bacons:{
        width:width,
        height:108,
        justifyContent:"flex-start",
        alignItems:"center",
        backgroundColor:"transparent",
        overflow:"visible",
        position:"relative"
    },
    imagehead:{
        width:100,
        height:100,
        borderRadius:600,
        overflow:"hidden",
    },
    items:{
        width:width-28,
        padding:14,
    }
}
class Personal extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            image:require("../../../../assets/images/headtemp.jpg"),
            curitem:{},
            ifshow:false,
            formvalue:{
                "qq":"15195593577",
                "partyname":"蓝湾国际党支部",
                "communist_id":1008,
                "mobile":"15195593577",
                "wechat":"12345",
                "is_communist":"0",
                "usr_org":"12345",
                "score":0,
                "duty_name":"普通党员",
                "img_url":require("../../../../assets/images/headtemp.jpg"),
                "usr_id":1008,
                "org_id":1115,
                "usr_idcard":"321027199007102429",
                "partyorg_name":"蓝湾国际党支部",
                "communist_dtm":"2012-06-10",
                "usr_name":"王菁菁",
                "usr_pwd":"123456",
                "email":"12345@163.com"
            },
            renderarr:[]
        }
    }
    componentDidMount(){
        let arr = [],{formvalue} = this.state,name="",sort = -1;
        for(let i in formvalue){
            switch (i){
                case "usr_name":
                    name = "姓名"
                    sort = 0
                    break;
                case "usr_idcard":
                    name = "身份证号"
                    sort = 1
                    break;
                case "partyname":
                    name = "所属党支部"
                    sort = 2
                    break;
                case "duty_name":
                    name = "党内职务"
                    sort = 3
                    break;
                case "partyorg_name":
                    name = "单位"
                    sort = 4
                    break;
                case "email":
                    name = "邮箱"
                    sort = 5
                    break;
                case "mobile":
                    name = "手机号"
                    sort = 6
                    break;
                case "wechat":
                    name = "微信号"
                    sort = 7
                    break;
                case "qq":
                    name = "QQ号"
                    sort = 8
                    break;
                default:
                    name=""
            }
            let str = `{"value":"${formvalue[i]}","name":"${name}","sort":"${sort}"}`,
                obj = JSON.parse(str);
            arr.push(obj)
        }
        arr.sort((curt,next)=>{
            return curt.sort - next.sort
        })



        this.setState({
            renderarr:arr
        })

    }
    /*拍照*/
    pickSingleWithCamera(cropping) {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
        }).then(image => {
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
            });
        }).catch(e => {});
    }

    /*选择图片*/
    pickSingle(cropit, circular=false) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(image => {
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
        }).catch(e => {
            console.log(e);
        });
    }
    /*清除图片*/
    cleanupSingleImage() {
        let image = this.state.image
        ImagePicker.clean().then(() => {
            this.setState({
                image:require("../../../../assets/images/headtemp.jpg")
            })
        }).catch(e => {
        });
    }





    render() {
        let { formvalue,renderarr,image,curitem,ifshow} = this.state;
        let itemcon = (item,i,length)=>{
            return(
                <ListItem last={i==length-1?true:false} style={{width:i==length-1?width:width-36}} key={i} onPress={()=>{alert(0)}}>
                    <Left style={{flex:1}}>
                        <Text>{item.name}</Text>
                    </Left>
                    <Right style={{flex:2.5}}>
                        <Text style={{textAlign:"right"}}>{item.value}</Text>
                    </Right>
                </ListItem>)
        }
        let itemcons = (item,i,length)=>{
            return(
                <SwipeRow key={i}
                    style={i==length-1?{width:width-28,borderBottomWidth:0}:{width:width-28}}
                    leftOpenValue={75}
                    rightOpenValue={-50}
                    disableRightSwipe = {true}
                    body={
                      <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Left style={{flex:1}}>
                            <Text>{item.name}</Text>
                        </Left>
                        <Right style={{flex:2.5}}>
                            <Text style={{textAlign:"right"}}>{item.value}</Text>
                        </Right>
                      </View>
                    }
                    right={
                      <Button success onPress={() => {
                           this.setState({
                                ifshow:true,
                                curitem:item
                           })
                      }}>
                        <Icon style={{marginLeft:0,textAlign:"center",marginRight:0,width:24}} active name="edit" type="Feather"/>
                      </Button>
                    }
                />
            )
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
                    <Text style={{color:"#fff",fontSize:20}}>个人信息</Text>
                    </Body>
                    <Right style={{flex:1}}>
                       <Text style={{fontSize:14,color:"#fff"}} onPress={()=>{this.props.navigation.navigate("PersonalEdit")}}>
                           编辑
                       </Text>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.bacons}>
                        <View style={[{height:68,width:width},styles.heads]}>
                        </View>
                        <View style={[styles.imagehead,{bottom:0,position:"absolute"}]}>
                            <TouchableHighlight style={{backgroundColor:"#DD5144"}} onPress={() =>
                                ActionSheet.show(
                                  {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    title: '请选择操作'
                                  },
                                  buttonIndex => {
                                    switch (buttonIndex){
                                        case 0:
                                          this.pickSingleWithCamera(true)
                                        break;
                                        case 1:
                                          this.pickSingle(true, true)
                                        break;
                                        case 2:
                                          this.cleanupSingleImage()
                                        break;
                                    }
                                  }
                                )}>
                                <View style={[styles.imagehead,{borderColor:"#fff",borderWidth:2}]}>
                                    <ImageBackground
                                        style={{width:100,height:100}}
                                        source={image}
                                        resizeMode='cover'>
                                    </ImageBackground>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View>
                        <List style={styles.items}>
                            {
                                renderarr.map((item,i)=>{
                                    return item.name==""?null:itemcons(item,i,renderarr.length)
                                })
                            }
                        </List>
                    </View>
                </Content>
                <ModalTextInput show={ifshow} str={`修改${curitem.name}`} value={curitem.value} btnstr="确定" pressFn={(val)=>{
                    let newarr = renderarr.map((items,i)=>{
                        if(items.name==curitem.name){
                            items.value = val
                        }
                        return items
                    })
                    this.setState({
                        renderarr:newarr,
                        ifshow:false
                    })
                }}></ModalTextInput>
            </Container>
        );
    }
}


export default Personal
