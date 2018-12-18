/**
 * Created by kurosaki on 2018/12/18.
 */
import React, { Component } from 'react';
import {  Container,Icon,Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import {timetrans} from '../../publicdata/Data';


const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    grid:{
        paddingTop:14,paddingBottom:14,
        flex:1,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
        justifyContent:"center",
        alignItems:"center",
    },
}


export default class CostHistoryItem extends React.PureComponent{
    render() {
        let {item,onPressFn} = this.props;
        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                        <Col size={1}>
                            <Text numberOfLines={1} style={{fontSize:16,marginBottom:8}}>
                                党费缴纳
                            </Text>
                            <Text numberOfLines={1} style={{fontSize:16}}>
                                {timetrans(item.timeStamp)}
                            </Text>
                        </Col>
                        <Col size={1} style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                            <View>
                                <Text style={{fontSize:14,color:"#999",marginBottom:8,textAlign:"right"}}>
                                    ¥ { item.cost }
                                </Text>
                                <Text style={{fontSize:14,color:"#999",textAlign:"right"}}>
                                    { item.desc }
                                </Text>
                            </View>
                            <Icon active name="chevron-small-right" type="Entypo" style={{color:"#DD5144"}}></Icon>

                        </Col>
                </Grid>
            )
        }


        return (
            <TouchableNativeFeedback  onPress={() =>{onPressFn()}}>
                <View style={styles.container}>
                    {
                        style1()
                    }
                </View>
            </TouchableNativeFeedback>


        );
    }
}