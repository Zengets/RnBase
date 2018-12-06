import React from "react";
import { LargeList } from "react-native-largelist-v2";
import { Container,Item,Label, Header, Left, Body, Right, Button, Icon, SwipeRow, Content ,Picker,Textarea } from 'native-base';
import { StyleSheet, Text, View,TextInput,Dimensions } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ModalTextInput } from '../../../../components';

const { width,height } = Dimensions.get('window')



export default class Cost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            curitem:{
                year:"2018",
                feearr:[]
            },
            curterm:{},
            ifshow:false,
            selected:"2018",
            year:"2018",
            lastyear:"2017",
            monthCostArr:[],
            months:[],
            costArr:[],//提交的arr
            total:0
        }
    }



    componentDidMount(){
        let year = parseInt(new Date().getFullYear()),month = parseInt(new Date().getMonth())+1,arr=[{
            year:year-1,
            feearr:[]
        },{
            year:year,
            feearr:[]
        }
        ];
        let newarr = arr.map((item) => {
            let feearr = [];
            if(item.year==year-1){
                if(month-3>0){
                    for(var i=1;i<13;i++){
                        let fee = {
                            month:i,
                            ispaied:i<3?12:0,
                            disabled:true
                        }
                        feearr.push(fee);
                    }
                }else{
                    let vals = 8+month;
                    for(var i=1;i<13;i++){
                        let fee = {
                            month:i,
                            ispaied:i<3?13:0,
                            disabled:i<vals?true:false
                        }
                        feearr.push(fee);
                    }
                }
            }else{
                for(var i=1;i<13;i++){
                    let fee = {
                        month:i,
                        ispaied:i<3||i==10?10:0,
                        disabled:month-i>4?true:false
                    }
                    feearr.push(fee);
                }
            }
            item.feearr = feearr;
            return item

        })

        setTimeout(()=>{
            this.setState({
                curitem:newarr[1],
                ifshow:false,
                selected:"2018",
                year:"2018",
                lastyear:"2017",
                monthCostArr:newarr
            })
        },10)
    }
    onValueChange(value: string) {
        this.setState({
            ifshow:false,
            selected: value,
            curitem:value==this.state.year?this.state.monthCostArr[1]:this.state.monthCostArr[0]
        });
    }

    callMoney(val){
        let { costArr,curterm,curitem,selected,monthCostArr } = this.state;
        curterm.ispaied = val;
        curterm.year = selected;
        if(val == 0){
            if(costArr.length==0){

            }else{
                costArr.map((item,i)=>{
                    if(item.month==curterm.month){
                        costArr.splice(i,1)
                    }else{

                    }
                })
            }
        }else{
            if(costArr.length==0){
                costArr.push(curterm);
            }else{
                let key = true;
                costArr.map((item)=>{
                    if(item.month == curterm.month){
                        item.ispaied = val;
                        key = false;
                    }
                })
                if(key){
                    costArr.push(curterm);
                }

            }

        }

        let feearr = curitem.feearr.map((item)=>{
            if(item.month==curterm.month){
                item.ispaied = val;
            }
            return item
        });

        monthCostArr = monthCostArr.map((item)=>{
            if(item.year==selected){
                item = curitem
            }
            return item
        })
        let total = 0,months = "";
        costArr.map((item,i)=>{
            total = total+parseFloat(item.ispaied);
            if(i==0){
                months += item.year+"."+item.month+"("+item.ispaied+"元)"
            }else{
                months += ","+item.year+"."+item.month+"("+item.ispaied+"元)"
            }

        })
        this.setState({
            curitem:curitem,
            costArr:costArr,
            monthCostArr:monthCostArr,
            ifshow:false,
            total:total,
            months:months
        })
    }

    toPay(total,months){
        this.props.navigation.navigate('CostSure', {
            total: total,
            months: months,
        });

    }

    render() {
        let {total,curitem,ifshow,months,curterm} = this.state;

        let picker = ()=>{
            return(
                <Picker
                    style={{marginRight:-8}}
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>选择年份</Title>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item label={"2017"} value={"2017"} />
                    <Picker.Item label={"2018"} value={"2018"} />
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
                    <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>党费缴纳</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Text style={{color:"#fff",fontSize:14}} onPress={()=>{
                            this.props.navigation.navigate("CostExplain")
                        }}>党费说明</Text>
                    </Right>
                </Header>
                <Content>
                    <View style={{padding:14,paddingTop:0,paddingBottom:0}}>
                        <Grid style={{borderBottomColor:"#f0f0f0",borderBottomWidth:1}}>
                            <Col size={3}>
                                <Text style={{lineHeight:50,fontSize:16}}>
                                    选择年份：
                                </Text>
                            </Col>
                            <Col size={1.4}>
                                {picker()}
                            </Col>
                        </Grid>
                        <Row style={{flexWrap:"wrap",justifyContent:"space-between",paddingTop:18}}>
                            {
                                curitem.feearr.map((item,i)=>{
                                     return (
                                         <View key={i} style={{width:width*0.14,marginBottom:0.03*width,justifyContent:"center",alignItems:"center"}}>
                                             <Button transparent style={{width:width*0.12,height:width*0.12,justifyContent:"center",alignItems:"center",marginBottom:10,alignSelf:"center",backgroundColor:item.disabled?"#eeeff0":!item.disabled&&item.ispaied!=0?"#ff5656":"transparent",borderColor:"#ff5656",borderWidth:!item.disabled&&item.ispaied==0?1:0}} rounded key={i} onPress={()=>{
                                            this.setState({
                                                curterm:item,
                                                ifshow:!item.disabled?true:false
                                            })
                                         }}>
                                                 <Text style={{color:!item.disabled&&item.ispaied!=0?"#fff":"#333"}}>{item.month}月</Text>
                                             </Button>
                                             <Text style={{width:width*0.14,textAlign:"center"}}>{item.ispaied}元</Text>
                                         </View>

                                     )
                                })
                            }
                        </Row>
                        <View style={{backgroundColor:"#f9f9f9",marginTop:12,paddingTop:10}}>
                            <Text style={{fontSize:16,borderBottomColor:"#f0f0f0",borderBottomWidth:1,paddingBottom:14,marginBottom:6}}>
                                备注:
                            </Text>
                            <Textarea style={{flex:1}} rowSpan={5} placeholder="请输入备注信息" />
                        </View>
                    </View>



                </Content>
                <ModalTextInput type="number" show={ifshow} str={`请输入${curterm.month}月份的党费`} btnstr="确认" pressFn={(val)=>this.callMoney(val)}></ModalTextInput>
                <View style={styles.footer}>
                    <View style={styles.textcontain}>
                        <Text style={{fontSize:16,color:"#333",paddingLeft:24}}>合计：￥</Text><Text style={{fontSize:16,color:"#DD5144"}}>{parseFloat(total)}</Text>
                    </View>
                    <Button danger style={{width:120,borderRadius:0,height:54,justifyContent:"center",alignItems:"center"}} onPress={() => {
                            this.toPay(total,months);
                        }}>
                        <Text style={{fontSize:16,color:"#fff"}}>缴费</Text>
                    </Button>
                </View>
            </Container>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer:{
        position:"absolute",
        bottom:0,
        height:54,
        width:width,
        borderTopWidth:2,
        borderTopColor:"#eeeeee",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    textcontain:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
});