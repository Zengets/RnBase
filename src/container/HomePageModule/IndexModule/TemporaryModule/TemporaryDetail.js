/**
 * Created by kurosaki on 2018/12/7.
 */
import React, { Component } from 'react';
import { Container,Content,Thumbnail, Header, Left, Body, Right, Button, Icon,Item,Label,Input } from 'native-base';
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
    TouchableNativeFeedback,
    WebView,
    Linking,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Titles,SchoolExamItem,ModalBottom } from '../../../../components'
import { data } from './DataSource'

const { width,height } = Dimensions.get('window')
const styles={
    heads:{
        backgroundColor:"#DD5144"
    },
    text1:{
        fontSize:16,
        color:"#333",
        paddingRight:12
    },
    text2:{
        fontSize:16,
        color:"#666"
    },
    fillcon:{
        height:300,
        backgroundColor:"#f0f0f0",
        width:width,
        flexDirection:"column",
        justifyContent:"space-between"
    }
}



class TemporaryDetail extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            ifshow:false,
            height: 30,
            id:props.navigation.getParam('id','NO-ID'),
            type:props.navigation.getParam('type','NO-ID'),
            curitem:{ "temppartyId": 3,
                "temppartyName": "余林社区临时党组织2",
                "temppartyTheme": "两学一做学习2",
                "telephone": "13082577979",
                "workContent": "两学一做学习2",
                "fstusrId": 1006,
                "fstusrDtm": 1540697098961,
                "lstusrId": 1006,
                "lstusrDtm": 1542786718504,
                "validSta": "0",
                "isDelete": "0",
                "orgSeq": null,
                "exta": null,
                "extb": null,
                "currentApplyCount": 1},
            an:new Animated.Value(height),//reset
            ans:new Animated.Value(height),//reset
            anc:new Animated.Value(-68),//reset
            anr:new Animated.Value(-68),//reset
            fillvalue:null
        }
        this.inside =  Animated.timing(
            this.state.an,
            {
                toValue: 0,
                duration: 400,
            }
        )
        this.insider =  Animated.timing(
            this.state.anr,
            {
                toValue: 30,
                duration: 400,
            }
        )
        this.insides =  Animated.timing(
            this.state.ans,
            {
                toValue: 0,
                duration: 400,
            }
        )
        this.insidec =  Animated.timing(
            this.state.anc,
            {
                toValue: 0,
                duration: 400,
            }
        )
    }
    //拨打电话
    linking(url){
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {

            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    cauculateHeight(e) {
        const height = e.nativeEvent.contentSize.height > 30 ? e.nativeEvent.contentSize.height : this.state.height;
        this.setState({height});
    }


    componentDidMount(){
        Animated.sequence([this.inside,this.insides,this.insidec,this.insider]).start();


    }


    render() {
        let { curitem,an,ans,anc,anr,type,ifshow,fillvalue } = this.state;

        let fillFn = () => {
            return(
                <View style={styles.fillcon}>
                    <View style={{padding:14,height:this.state.height+60,maxHeight:248}}>
                        <Label>填写工作进展</Label>
                        <Input
                            ref = {textInput => this.TextInput = textInput}
                            onContentSizeChange = {e => this.cauculateHeight(e)}
                            scrollEnabled = {true}
                            style={{paddingVertical: 0,color:"#333",width:width-28,height: this.state.height,marginTop:12}}
                            multiline = {true}
                            onChangeText={(val) => this.setState({
                               fillvalue:val
                            })}
                            placeholder="请输入..."
                            value={fillvalue}
                            clearButtonMode="always"
                        />
                    </View>
                    <Button full danger>
                        <Text style={{fontSize:16,color:"#fff"}}>提交</Text>
                    </Button>

                </View>
            )
        }

        return (
            <Container  style={{position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}> {type==1?"服务详情":"申请加入"}</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Text style={{color:"#fff"}}>
                            {type==1?"服务记录":""}
                        </Text>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <Animated.View style={{width:width-28,marginTop:an}}>
                        <Grid>
                            <Col size={1}>
                                <Thumbnail source={require("../../../../assets/images/logos.png")} />
                            </Col>
                            <Col size={4} style={{justifyContent:"center"}}>
                                <Text style={{marginTop:8,color:"#DD5144",fontSize:16}}>{curitem.temppartyName}</Text>
                                <Text style={{marginTop:6,fontSize:14}} note>{curitem.temppartyTheme}</Text>
                            </Col>
                        </Grid>
                    </Animated.View>
                    <Animated.View style={{width:width-28,marginTop:ans}}>
                        <Grid>
                            <Row style={{marginBottom:12,marginTop:18,paddingTop:12,borderTopColor:"#f0f0f0",borderTopWidth:4}}>
                                <Text style={styles.text1}>
                                    联系电话
                                </Text>
                                <Text style={styles.text2}>
                                    {curitem.telephone}
                                </Text>
                            </Row>
                            <Row style={{marginBottom:12,paddingTop:12,borderTopColor:"#f0f0f0",borderTopWidth:4}}>
                                <Text style={styles.text1}>
                                    组织人数
                                </Text>
                                <Text style={styles.text2}>
                                    {curitem.currentApplyCount}人
                                </Text>
                            </Row>
                            <Row style={{marginBottom:12,paddingTop:12,borderTopColor:"#f0f0f0",borderTopWidth:4}}>
                                <Text style={[styles.text1,{paddingTop:8}]}>
                                    工作内容
                                </Text>
                                <WebView style={{flex:1,height:88,marginLeft:-8}} source={{ html: curitem.workContent, baseUrl: '' }}>
                                </WebView>
                            </Row>
                        </Grid>
                    </Animated.View>
                </Content>
                <Animated.View  style={{position:"absolute",bottom:anc,width:width,height:46}}>
                    <Button full danger style={{height:46,justifyContent:"center",alignItems:"center"}} onPress={()=>{
                        if(type==1){
                            this.setState({
                                ifshow:true
                            })
                        }else{

                        }
                    }}>
                        <Text style={{color:"#fff",fontSize:16}}>
                            {type==1?"填写服务记录":"立即申请"}
                        </Text>
                    </Button>
                </Animated.View>

                <Animated.View  style={{height:50,width:50,position:"absolute",right:anr,bottom:65}}>
                    <Button full rounded style={{height:50,width:50,justifyContent:"center",alignItems:"center",backgroundColor:"#34A34F"}} onPress={()=>{
                    this.linking("tel:"+curitem.telephone)
                    }}>
                        <Icon  type="Entypo" name="phone" style={{color:"#fff",marginLeft:12}}></Icon>
                    </Button>
                </Animated.View>


                <ModalBottom swipe={false} show={ifshow} renderFn={()=>{return fillFn()}}></ModalBottom>


            </Container>
        );
    }
}


export default TemporaryDetail
