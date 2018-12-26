/**
 * Created by kurosaki on 2018/12/21.
 */
import React, { Component } from 'react';
import { ScrollView, StatusBar, Dimensions, Text,View } from 'react-native';
import { Container,Content, Header, Left, Body, Right, Button, Icon,Picker,Spinner,ListItem,List } from 'native-base';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import { data, contributionData, pieChartData, progressChartData } from './data'
import { Col, Row, Grid } from 'react-native-easy-grid';

const { width,height } = Dimensions.get('window')

const styles={
    container:{
        flex:1,
    },
    heads:{
        backgroundColor:"#DD5144"
    },
    conlayout:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    icon:{
        fontSize:30,
        color:"#DD5144",
        paddingRight:10
    },
    texter:{
        fontSize:18,
        color:"#DD5144"
    }
}
const configs = {
    line:{
        backgroundColor: '#DD5144',
        backgroundGradientFrom: '#e27c72',
        backgroundGradientTo: '#DD5144',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
        style: {
            marginVertical: 8,
            borderRadius: 8,
        }
    },
    pie: {
        backgroundColor: '#022173',
        backgroundGradientFrom: '#022173',
        backgroundGradientTo: '#1b3fa0',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            marginVertical: 8,
            borderRadius: 8,
        }
    }
}

export default class Chart extends  Component<Props>{
    constructor(props){
        super(props)
        this.state = {
             data:{
                labels: ['18-30', '30-40', '40-50', '50-60', '60-70', '>70'],
                datasets: [
                {data: [50,20,2,86,71,100]}
                ]
            },
            datapie:[
                { name: '博士', population:20, color: 'rgba(131, 167, 234, 1)',legendFontColor: '#333', legendFontSize: 14 },
                { name: '硕士', population: 30, color: '#ff7800',legendFontColor: '#333', legendFontSize: 14 },
                { name: '本科', population: 100 , color: '#DD5144',legendFontColor: '#333', legendFontSize: 14 },
                { name: '专科', population: 10, color: '#022173',legendFontColor: '#333', legendFontSize: 14 },
                { name: '其他', population: 2, color: 'rgb(0, 0, 255)',legendFontColor: '#333', legendFontSize: 14 }
            ],
            databar:[
                {name:'四联村总支部',value:100},
                {name:'王水街商圈总支部',value:20},
                {name:'蒋王社区',value:40},
                {name:'区蒋王中学总支部',value:45},
                {name:'将以社区总支部',value:15},
                {name:'越来村总支部',value:23}
            ],
            total:1
        }
    }
    componentDidMount(){
        let count = 0;
        this.state.databar.map((item,i)=>{
            count += item.value
        });
        this.setState({
            total:count
        })

    }



    render() {
        let {data,datapie,databar,total}=this.state;
        let basewidth = (width-38)/3;
        return (
            <Container>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>党建看板</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <View style={[styles.conlayout,{paddingBottom:10,marginTop:6,borderBottomColor:"#f0f0f0",borderBottomWidth:1}]}>
                        <Left style={styles.conlayout}>
                            <Icon style={styles.icon} name="users" type="Feather"></Icon>
                            <View>
                                <Text>党支部</Text>
                                <Text style={styles.texter}>350个</Text>
                            </View>
                        </Left>
                        <Right style={styles.conlayout}>
                            <Icon style={[styles.icon,{paddingRight:6}]} name="user" type="Feather"></Icon>
                            <View>
                                <Text>党员</Text>
                                <Text style={styles.texter}>1123人</Text>
                            </View>
                        </Right>
                    </View>

                    <Text style={{color:"#DD5144",padding:6,paddingTop:14,fontSize:16}}>
                        党员年龄分布
                    </Text>
                    <LineChart
                        data={data}
                        width={width-28} // from react-native
                        height={200}
                        chartConfig={configs.line}
                        bezier
                        style={configs.line.style}
                    />

                    <Text style={{color:"#DD5144",borderTopColor:"#f0f0f0",borderTopWidth:1,padding:6,paddingTop:14,fontSize:16,marginTop:10}}>
                        党员学历分布
                    </Text>
                    <PieChart
                        data={datapie}
                        width={width}
                        height={200}
                        chartConfig={configs.pie}
                        style={configs.pie.style}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="10"
                    />
                    <Text style={{color:"#DD5144",borderTopColor:"#f0f0f0",borderTopWidth:1,padding:6,paddingTop:14,fontSize:16,paddingBottom:10}}>
                        党员社区分布
                    </Text>
                    <List style={{paddingBottom:24}}>
                        <Row style={{paddingTop:12,paddingBottom:12,backgroundColor:"#f0f0f0"}}>
                            <View style={{flex:2,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                <Text style={{fontSize:16,paddingLeft:6}}>
                                    社区
                                </Text>
                                <Text style={{fontSize:16}}>
                                    党员数
                                </Text>
                            </View>

                            <Text style={{width:10}}>

                            </Text>
                            <Text style={{flex:1,fontSize:16,textAlign:"center"}}>
                                占比
                            </Text>
                        </Row>
                        {
                            databar.map((item,i)=>{
                               return(
                                   <ListItem key={i} style={{flexDirection:"row",alignItems:"center",marginLeft:0,paddingRight:0}}>
                                       <View style={{flex:2,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                           <Text numberOfLines={1} style={{paddingLeft:6}}>{item.name}</Text>
                                           <Text style={{width:48,color:"#DD5144",textAlign:"left"}}>{item.value}人</Text>
                                       </View>
                                       <View style={{width:10}}>
                                       </View>
                                       <View style={{flex:1}}>
                                           <View style={{flex:1,borderColor:"#f0f0f0",borderRadius:60,borderWidth:1,height:18,overflow:"hidden"}}>
                                               <View style={{width:basewidth*item.value/total,backgroundColor:"#DD5144",borderRadius:60,height:16}}></View>
                                           </View>
                                       </View>
                                   </ListItem>
                               )
                            })
                        }
                    </List>



            </Content>



            </Container>
        )
    }
}