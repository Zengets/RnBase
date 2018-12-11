/**
 * Created by kurosaki on 2018/12/11.
 */
import React, { Component } from 'react';
import {  Container, Header, Content, Tab, Tabs,Fab, ScrollableTab , Button, Icon, Left, Right, Body,Title } from 'native-base';
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
import { MapView } from 'react-native-amap3d'




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


export default class ServiceDetail extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            active:true,
            fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
            center:{
                latitude:  32.359198,
                longitude: 119.369435,
            },
            curitem:{
                "commusit_name": "焦红英, 严亚云,王坤,武超,刘平,王菁菁,舒敏,马道林,何慧,郭云飞",
                "service_type": 1,
                "type_name": "扶贫帮困",
                "service_maxcount": 20,
                "service_community": "余林",
                "service_desc": "余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困余林社区扶贫帮困",
                "service_name": "余林社区扶贫帮困",
                "org_id": 1105,
                "service_id": 1,
                "service_communist": "1019,1012,1013,1017,1004,1008,1020,1021,1022,1001",
                "org_name": "水晶城支部",
                "service_address": "余林社区",
                "service_endtime": 1546236154430,
                "isApply": true,
                "num": 1
            }
        }
        this.bigger = Animated.timing(                  // 随时间变化而执行动画
            this.state.fadeAnim,            // 动画中的变量值
            {
                toValue: (height-180)*0.45,                   // 透明度最终变为1，即完全不透明
                duration: 1000,              // 让动画持续一段时间
            }
        )
        this.smaller = Animated.timing(                  // 随时间变化而执行动画
            this.state.fadeAnim,            // 动画中的变量值
            {
                toValue:0 ,                   // 透明度最终变为1，即完全不透明
                duration: 1000,              // 让动画持续一段时间
            }
        )

    }
    //重置
    _animatedToYZ = () => {
        this.mapView.animateTo({
            tilt: 45,
            rotation: 0,
            zoomLevel: 14,
            coordinate: this.state.center
        })
    }
    //打开地图
    openRouter = () => {
        let {longitude,latitude} = this.state.center;
        MyUtil.turn2MapApp(longitude, latitude, 'gaode');
    }
    componentDidMount(){
        //this.bigger.start();
    }

    render() {
        let {curitem,center,active,id} = this.state;


        return (
            <Container style={{flex:1,position:"relative"}}>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#fff",fontSize:20}}>服务详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Text style={{color:"#fff",fontSize:14}} onPress={() => this.props.navigation.navigate("ServiceHistory",{
                            id: id,
                        })}>服务记录</Text>
                    </Right>
                </Header>
                <Content>
                    <MapView
                        tilt= {45}
                        zoomLevel={14}
                        ref={ref => this.mapView = ref}
                        mapType={"standard"}
                        locationEnabled={false}//地图定位
                        showsCompass={false}//指南针
                        showsScale={true}//比例尺
                        showsLocationButton={false}//地图定位按钮
                        showsZoomControls={false}//缩放按钮
                        style={styles.map}
                        coordinate={center}
                    >
                        <MapView.Marker
                                color="rose"
                                coordinate={center}
                                //title={curitem.service_address}
                        >
                            <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                                <View style={styles.customInfoWindow}>
                                    <Text>{curitem.service_address}</Text>
                                </View>
                            </TouchableOpacity>
                        </MapView.Marker>
                        </MapView>
                        <Row style={[styles.rows,{padding:14,width:width,backgroundColor:"#f0f0f0",borderTopColor:"#ccc",borderTopWidth:1,borderBottomColor:"#ccc",borderBottomWidth:1}]}>
                            <Text style={styles.titled}>
                                地址
                            </Text>
                            <Text style={styles.cons}>
                                {curitem.service_address}
                            </Text>
                        </Row>
                        <Animated.View style={{width:width,height:(height-180)*0.45}}>
                            <ScrollView style={styles.srcollView}>
                                <Row style={styles.rows}>
                                    <Text style={styles.titled}>
                                        服务名称
                                    </Text>
                                    <Text style={styles.cons}>
                                        {curitem.service_name}
                                    </Text>
                                </Row>
                                <Row style={styles.rows}>
                                    <Text style={styles.titled}>
                                        发布组织
                                    </Text>
                                    <Text style={styles.cons}>
                                        {curitem.org_name}
                                    </Text>
                                </Row>
                                <Row style={styles.rows}>
                                    <Text style={styles.titled}>
                                        服务社区
                                    </Text>
                                    <Text style={styles.cons}>
                                        {curitem.service_community}
                                    </Text>
                                </Row>
                                <Row style={styles.rows}>
                                    <Text style={styles.titled}>
                                        服务人数
                                    </Text>
                                    <Text style={styles.cons}>
                                        {curitem.num+"/"+curitem.service_maxcount}
                                    </Text>
                                </Row>
                                <Row style={styles.rows}>
                                    <Text style={styles.titled}>
                                        服务内容
                                    </Text>
                                    <View style={{flex:1,justifyContent:"flex-end",flexDirection:"row"}}>
                                        <Text style={{fontSize:14,color:"#666",lineHeight:21}}>
                                            {curitem.service_desc}
                                        </Text>
                                    </View>

                                </Row>



                            </ScrollView>
                        </Animated.View>
                    <Fab
                        active={active}
                        direction="down"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF',marginTop:68 }}
                        position="topRight"
                        onPress={() => this.setState({active: !active })}>
                        <Icon name="menu" />
                        <Button rounded full style={{backgroundColor: '#DD5144'}} onPress={this._animatedToYZ}>
                            <Icon name="cycle" type="Entypo"/>
                        </Button>
                        <Button rounded full style={{backgroundColor: '#34A34F'}} onPress={this.openRouter}>
                            <Icon style={{marginTop:2,marginRight:3}} name="navigation" type="Feather"></Icon>
                        </Button>
                    </Fab>


                </Content>
                <Button full danger style={{position:"absolute",bottom:0,width:width,justifyContent:"center",alignItems:"center"}}  onPress={() => this.props.navigation.navigate("ServiceOrder",{
                    id: id,
                })}>
                    <Text style={{color:"#fff",fontSize:16}}>预约</Text>
                </Button>



            </Container>

        );
    }
}