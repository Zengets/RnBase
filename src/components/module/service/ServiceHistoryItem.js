/**
 * Created by kurosaki on 2018/12/11.
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
        padding:14,
        paddingTop:20,
        paddingBottom:0
    },
    grid:{
        flex:1,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
        justifyContent:"center",
        alignItems:"center"
    },
}


export default class ServiceHistoryItem extends React.PureComponent{
    render() {
        let {item,onPressFn} = this.props;
        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Row>
                        <Col size={1}>
                            <Text numberOfLines={1} style={{fontSize:16}}>
                                {item.title}
                            </Text>
                        </Col>
                        <Col style={{width:120,textAlign:"right"}}>
                            <Text style={{fontSize:14,color:"#999"}}>
                                {timetrans(item.service_date)}
                            </Text>
                        </Col>
                    </Row>
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