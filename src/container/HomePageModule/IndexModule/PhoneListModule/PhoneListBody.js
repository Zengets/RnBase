import React from "react";
import { StyleSheet, Text, View,TextInput,Dimensions,Animated,TouchableWithoutFeedback,TouchableOpacity,Linking } from "react-native";
import { LargeList } from "react-native-largelist-v2";
import { Container, Header, Left, Body, Right, Button, Icon, SwipeRow, Content ,Card, CardItem,Picker,List,ListItem,Thumbnail,Spinner } from 'native-base';
import {Modals,ModalBottom,HttpUtils,BASE_URL,PORT_NAME,ConvertPinyin,arraySearch, ucfirst} from '../../../../components'




const { width,height } = Dimensions.get('window')
export default class PhoneListBody extends React.Component {
    _sectionCount = 10;
    _rowCount = 10;
    _scrollView = null;
    constructor(props){
        super(props);
        this.state = {
            isSpin:true,
            selected:props.selected,
            fadeAnim: new Animated.Value(0),
            cur:"A",
            ifshow:false,
            ifshower:false,
            curitem:{},
            contacts:[],
            keyword:""
        }
    }
    generateBig(){
        var ch_big = 'A';
        var str_big = [];
        for(var i=0;i<26;i++){
            str_big.push(String.fromCharCode(ch_big.charCodeAt(0)+i))
        }
        return str_big;
    }//zimu


    componentDidMount(){
        this.genData()
    }

    genData(){
        this.setState({
            isSpin:true
        })
        let {keyword,selected} = this.state;//selected?selected.id:
        HttpUtils.get(BASE_URL+PORT_NAME.getContactListForApp+`?keyWord=${keyword}&orgId=${""}&page=0&size=0`).then((res)=>{
            if(res.code==0){
                console.log(res)
                let newdata=[],pastdata = res.data.map((item,i)=>{
                    item.header = ConvertPinyin(item.name).substring(0,1).toUpperCase();
                    return item
                }),letterarr = this.generateBig();
                letterarr.push("#");
                letterarr.map((item,i)=>{
                    let items = [],itemz = [];
                    pastdata.map((list,index)=>{
                      if(item == list.header){
                          items.push(list)
                      }else if(letterarr.indexOf(list.header)==-1){
                          itemz.push(list)
                      }
                    })
                    let curitem = {
                        header: item,
                        items:item=="#"?itemz:items
                    }
                    curitem.items.length==0?null:newdata.push(curitem);
                })
                this.setState({
                    contacts:newdata,
                    ifshow:false,
                    ifshower:false,
                    isSpin:false
                })
                console.log(selected.id)
            }else{
                console.log(res)
            }

        }).catch(()=>{
        })
    }

    getDetail(key){
        HttpUtils.get(BASE_URL+PORT_NAME.getContactDetailForApp+`?id=${key.id}`).then((res)=>{
            if(res.code==0){
                console.log(res.data)
                this.setState({
                    ifshower:true,
                    ifshow:false,
                    curitem:res.data,
                })



            }else{
                console.log(res)
            }

        }).catch(()=>{
        })
    }


    componentWillReceiveProps(nextProps){
        if(this.props.selected!=nextProps.selected){
            this.setState({
                selected:nextProps.selected
            },()=>{
                //this.genData()     //toreset
            })
        }
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



    render() {
        let {fadeAnim,cur,ifshow,curitem,ifshower,contacts,isSpin} = this.state;

        const rightRender = (item,i)=>{
            return (
            <TouchableWithoutFeedback key={i} onPress={()=>{
                    this._scrollView.scrollToIndexPath({section:i,row:0},false);
                }} onLongPress={()=>{
                    this._scrollView.scrollToIndexPath({section:i,row:0},false);
                    this.setState({
                        cur:item.header
                    })
                    Animated.timing(
                          this.state.fadeAnim,
                          {
                            toValue: 1,
                            duration: 400,
                          }).start();
                }} onPressOut={()=>{
                    Animated.timing(
                          this.state.fadeAnim,
                          {
                            toValue: 0,
                            duration: 20,
                          }).start();
                }}
            >
                <Text style={{marginBottom:2,fontSize:14}}>
                    {item.header}
                </Text>
            </TouchableWithoutFeedback>
            )
        }



        return (
            <View style={{position:"relative",flex:1}}>
                {
                    isSpin?
                        <Spinner color='red'></Spinner>:
                        null
                }
                <LargeList
                    ref={ref=>(this._scrollView = ref)}
                    style={styles.container}
                    data={contacts}
                    heightForSection={() => 50}
                    renderSection={this._renderSection}
                    heightForIndexPath={() => 77}
                    renderIndexPath={this._renderIndexPath}
                    renderHeader={this._renderHeader}
                    renderFooter={this._renderFooter}
                />
                <View style={{position:"absolute",width:20,height:height-80,right:6,justifyContent:"center",alignItems:"center"}}>
                    {
                        contacts.map((item,i)=>{
                            return rightRender(item,i)
                        })
                    }
                </View>
                <Animated.View
                    style={{
                      position:"absolute",
                      width:80,
                      height:80,
                      left:(width-80)/2,
                      top:(height-120)/2,
                      opacity: fadeAnim,
                      backgroundColor:"rgba(0,0,0,0.75)",
                      borderRadius:8,
                      justifyContent:"center",
                      alignItems:"center"
                    }}
                >
                    <Text style={{fontSize:32,color:"#fff"}}>{cur}</Text>
                </Animated.View>
                <Modals show={ifshow} str={`是否呼叫${curitem.name}?`} btnstr="拨打" pressFn={()=>{
                    this.linking(`tel:${curitem.mobile}`);
                }}></Modals>

                <ModalBottom show={ifshower}  pressFn={()=>{
                    this.linking(`tel:${curitem.mobile}`);
                }} renderFn={()=>{
                    return(
                   <Card style={{flex: 0}} transparent>
                        <CardItem>
                          <Left>
                             <Thumbnail source={require("../../../../assets/images/headtemp.jpg")} />
                            <Body>
                              <Text>{curitem.name}</Text>
                              <Text style={{marginTop:10}} note numberOfLines={1}>{curitem.duty}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#f9f9f9"}}>
                          <Body>
                            <View style={{marginBottom:8,flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{width:68,textAlign:"right"}}>
                                  电话号码:
                                </Text>
                                 <Text style={{flex:1,textAlign:"right"}}>
                                  {curitem.mobile}
                                </Text>
                            </View>
                            <View style={{marginBottom:8,flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{width:68,textAlign:"right"}}>
                                  微信号码:
                                </Text>
                                 <Text style={{flex:1,textAlign:"right"}}>
                                  {curitem.wechat}
                                </Text>
                            </View>
                             <View style={{marginBottom:8,flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{width:68,textAlign:"right"}}>
                                  QQ号码:
                                </Text>
                                 <Text style={{flex:1,textAlign:"right"}}>
                                  {curitem.qq}
                                </Text>
                            </View>
                             <View style={{marginBottom:8,flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{width:68,textAlign:"right"}}>
                                  党支部:
                                </Text>
                                 <Text style={{flex:1,textAlign:"right"}}>
                                  {curitem.org}
                                </Text>
                            </View>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Left style={{flex:1}}></Left>
                          <Right style={{width:58}}>
                            <Button transparent textStyle={{color: '#666'}} onPress={() =>{
                                this.setState({
                                    ifshow:true,
                                    ifshower:false,
                                })
                            }}>
                              <Text style={{paddingRight:6}}>拨号</Text>
                              <Icon type="Entypo" name="phone" style={{color:"#34A34F"}}/>
                            </Button>
                          </Right>
                        </CardItem>
                  </Card>




                   )

                }}></ModalBottom>

            </View>
        );
    }
    _renderHeader = () => {
        let { keyword }= this.state;
        return (
            <TextInput
                style={styles.search}
                onChangeText={(keyword) => this.setState({keyword,ifshow:false,ifshower:false})}
                value={keyword}
                placeholder="请输入姓名搜索..."
                onSubmitEditing={()=>{
                    this.genData()
                }}
                returnKeyType="done"
            />
        );
    };
    _renderFooter = () => {
        return (
            <Text style={{ marginVertical: 20, alignSelf: "center" }}>
            </Text>
        );
    };
    _renderSection = (section: number) => {
        return (
            <View style={styles.section}>
                <Text style={{paddingLeft:24}}>
                    {this.state.contacts[section].header}
                </Text>
                <Text style={{paddingRight:24}}>
                    {this.state.selected?this.state.selected.name:""}
                </Text>
            </View>
        );
    };

    _renderIndexPath = ({ section: section, row: row }) => {
        let item = this.state.contacts[section].items[row]
        return (
                <ListItem thumbnail onPress={() =>{
                            this.getDetail(item);
                        }}>
                    <Left>
                        <Thumbnail source={item.photo?{uri:item.photo}:require("../../../../assets/images/headtemp.jpg")} />
                    </Left>
                    <Body style={{flex:3}}>
                    <Text>{item.name}</Text>
                    <Text style={{marginTop:10}} note numberOfLines={1}>{item.usrMobile}</Text>
                    </Body>
                    <Right style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity>
                            <Button transparent onPress={() =>{
                                this.setState({
                                    ifshow:item.usrMobile?true:false,
                                    ifshower:false,
                                    curitem:item,
                                })
                            }}>
                                <Icon type="Entypo" name="phone" style={{color:"#34A34F"}}/>
                            </Button>
                        </TouchableOpacity>

                    </Right>
                </ListItem>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section: {
        flex: 1,
        backgroundColor: "lightgray",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    row: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    search:{
        paddingLeft:12,
        height:40,
        fontSize:18
    },
    line: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: "#EEE"
    }
});