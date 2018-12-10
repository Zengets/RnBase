import React from "react";
import { LargeList } from "react-native-largelist-v2";
import { Container,Item,Label, Header, Left, Body, Right, Button, Icon, Fab, Content ,Picker,Textarea } from 'native-base';
import { Linking,StyleSheet, Text, View,TextInput,Dimensions,PermissionsAndroid,ToastAndroid,TouchableOpacity,Animated,Image,TouchableNativeFeedback,ScrollView } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ModalTextInput,ModalBottom } from '../../../../components';
import { MapView } from 'react-native-amap3d'
import { data } from './DataSource'

const { width,height } = Dimensions.get('window')


export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.mapView = null;
        this.state={
            active:false,
            selected:"standard",
            ifshow:false,
            findarr:[],
            fadeAnim: new Animated.Value(-88),
            fadeAnims: new Animated.Value(-280),
            center:{
                latitude:  32.359198,
                longitude: 119.369435,
            },
            mycenter:{
                latitude:null,
                longitude:null,
            },
            data:data,
            curitem:data[0]
        }
        this.shows =  Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 600,
            }
        );
        this.hides =  Animated.timing(
            this.state.fadeAnim,
            {
                toValue: -88,
                duration: 600,
            }
        );
        this.showes =  Animated.timing(
            this.state.fadeAnims,
            {
                toValue: 0,
                duration: 600,
            }
        );
        this.hidees =  Animated.timing(
            this.state.fadeAnims,
            {
                toValue: -280,
                duration: 600,
            }
        );


    }
    //重置
    _animatedToYZ = () => {
        this.setState({ifshow:false})
        this.mapView.animateTo({
            tilt: 45,
            rotation: 0,
            zoomLevel: 14,
            coordinate: {
                latitude:  32.359198,
                longitude: 119.369435,
            },
        })
    }
    //重新定位
    _animatedToMine(obj){
        this.setState({ifshow:false})
        this.mapView.animateTo({
            tilt: 45,
            rotation: 0,
            zoomLevel: 18,
            coordinate: obj
        })
    }

    //定位
    _animatedToCenter = () => {
        this.getLocation((val)=>{
            this.mapView.animateTo({
                tilt: 45,
                rotation: 0,
                zoomLevel: 18,
                coordinate:val
            })
        });


    }
    //获取位置
    getLocation (fn){
        this.setState({ifshow:false})
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latitude = position.coords.latitude-0.0028,
                    longitude= position.coords.longitude+0.0048;
                this.setState({
                    mycenter: {
                        latitude:latitude,
                        longitude: longitude,
                    }
                });
                fn({
                    latitude:latitude,
                    longitude: longitude,
                })
            },
            (error) => {
                ToastAndroid.show("请打开定位功能!",ToastAndroid.SHORT);

            },
            {enableHighAccuracy: true, timeout: 20000}
        );
    }

    componentWillMount(){
       this.getLocation(()=>{})
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

    //查找点
    getCur(key){
        ToastAndroid.show("查找中请稍等...",ToastAndroid.SHORT)
        let findarr = data.filter((item)=>{
            return item.name.indexOf(key)!=-1
        })
        this.setState({
            findarr:findarr,
            ifshow:false
        })
        this.showes.start();

    }



    _onInfoWindowPress = () => alert('onInfoWindowPress')

    onValueChange(value: string) {
        this.setState({
            selected: value,
        });
    }


    render() {
        let {ifshow,findarr,selected,center,active,data,mycenter,fadeAnim,fadeAnims,curitem} = this.state;
        let renderItem = (item,i) => {
            let itemz = curitem;
            if(item){
                itemz = item;
            }else{
                itemz = curitem;
            }
            return(<TouchableNativeFeedback key={i} onPress={()=>{
                        this.setState({
                            curitem:itemz
                        })
                        this._animatedToMine({latitude: itemz.latitude,longitude: itemz.longitude})}}>
                <View style={styles.footercontain}>
                    <View style={styles.footerLeft}>
                        <View style={styles.footerView}>
                            <Image style={{width:18,height:18,marginRight:8}} source={require('../../../../assets/images/home1.png')}></Image>
                            <Text>{itemz.name}</Text>
                        </View>
                        <View style={[styles.footerView,{marginTop:10}]}>
                            <Image style={{width:20,height:20,marginRight:6}} source={require('../../../../assets/images/locations.png')}></Image>
                            <Text>{itemz.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.footerRight}>
                        <Button transparent onPress={() =>{
                            if(itemz.phone){
                                this.linking("tel:"+itemz.phone)
                            }else{
                                 ToastAndroid.show("该组织暂无联系方式!", ToastAndroid.SHORT);
                            }
                            }}>
                            <Icon type="Entypo" name="phone" style={{color:"#34A34F"}}/>
                        </Button>
                    </View>
                </View>
            </TouchableNativeFeedback>)

        }

        let items = ()=>{
            return(
                findarr.map((item,i)=>{
                    return renderItem(item,i)
                })
            )
        }


        let picker = ()=>{
            return(
                <Picker
                    style={{ marginRight:-8,color:"#fff" }}
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>地图模式</Title>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" style={{ color: "#fff" }}/>}
                    selectedValue={selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item label="标准 " value="standard" />
                    <Picker.Item label="卫星 " value="satellite" />
                    <Picker.Item label="导航 " value="navigation" />
                    <Picker.Item label="夜间 " value="night" />
                    <Picker.Item label="公交 " value="bus" />
                </Picker>)
        }
        return (
            <Container style={{flex:1,position:"relative"}}>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{flex:3,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>党建地图</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        {picker()}
                    </Right>
                </Header>
                <Content>
                    <MapView
                        onPress={()=>{this.hides.start();this.hidees.start();}}
                        ref={ref => this.mapView = ref}
                        mapType={selected}
                        locationEnabled={false}//地图定位
                        showsCompass={false}//指南针
                        showsScale={true}//比例尺
                        showsLocationButton={false}//地图定位按钮
                        showsZoomControls={false}//缩放按钮
                        style={styles.map}
                        coordinate={center}
                    >
                        {
                            data.map((item,i)=>{
                                return(
                                    <MapView.Marker key={i} color={curitem.name==item.name?"red":"rose"} coordinate={{
                                      latitude: parseFloat(item.latitude),
                                      longitude: parseFloat(item.longitude),
                                    }} onPress={()=>{
                                        this.shows.start();
                                        this.setState({
                                            curitem:item,
                                            ifshow:false
                                        })
                                    }}>
                                        <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                                            <View style={styles.customInfoWindow}>
                                                <Text>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </MapView.Marker>
                                )
                            })
                        }

                        {
                            mycenter.longitude?
                                <MapView.Marker onPress={()=>{
                                        this.hides.start();
                                         this.setState({
                                            ifshow:false
                                        })
                                    }}
                                    image={"../../../../assets/images/location.png"}
                                    title="你的位置"
                                    onPress={this._onMarkerPress}
                                    coordinate={mycenter}
                                />:
                                null
                        }

                    </MapView>
                    <Fab
                        active={active}
                        direction="down"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF',marginTop:68 }}
                        position="topRight"
                        onPress={() => this.setState({active: !active })}>
                        <Icon name="menu" />
                        <Button rounded full style={{backgroundColor: '#3B5998'}} onPress={()=>{this.setState({ifshow:true})}}>
                            <Icon name="search"/>
                        </Button>
                        <Button rounded full style={{backgroundColor: '#34A34F'}} onPress={this._animatedToYZ}>
                            <Icon name="cycle" type="Entypo"/>
                        </Button>
                        <Button rounded full style={{backgroundColor: '#DD5144'}} onPress={this._animatedToCenter}>
                            <Icon name="hair-cross" type="Entypo"></Icon>
                        </Button>
                    </Fab>
                </Content>
                <Animated.View style={[styles.footer,{bottom:fadeAnim}]}>
                    {renderItem()}
                </Animated.View>
                <Animated.View style={[styles.footers,{bottom:fadeAnims}]}>
                    <ScrollView style={{height: 280,width:width}}>
                        {items()}
                    </ScrollView>
                </Animated.View>

                <ModalTextInput type="text" show={ifshow} str="请输入关键词查找" btnstr="查找" pressFn={(key)=>{this.getCur(key)}}></ModalTextInput>



            </Container>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map:{
        width:width,
        height:height-74
    },
    btn:{
        position:"absolute",
        bottom:200,
        right:10,
        width:46,
        height:46,
        justifyContent:"center",
        alignItems:"center"

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
    footer:{
        position:"absolute",
        height:88,
        backgroundColor:"#fff",
        width:width,
        borderTopWidth:2,
        borderTopColor:"#eeeeee",
    },
    footers:{
        position:"absolute",
        height:280,
        backgroundColor:"#fff",
        width:width,
        borderTopWidth:2,
        borderTopColor:"#eeeeee",
    },
    footercontain:{
        height:88,
        width:width,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    footerLeft:{
        flex:1,
        justifyContent:"center",
        alignItems:"flex-start"
    },
    footerView:{
        flexDirection:"row",
        paddingLeft:18,
        alignItems:"center",
    },
    footerRight:{
        borderLeftWidth:1,
        width:88,
        justifyContent:"center",
        alignItems:"center",
        borderLeftColor:"#f0f0f0",
        paddingLeft:12
    },
    textcontain:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
});