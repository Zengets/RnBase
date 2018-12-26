/**
 * Created by kurosaki on 2018/12/19.
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

export default class ApplicationItem extends React.PureComponent{
    render() {
        let {item,onPressFn} = this.props;
        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Col size={1}>
                        <Row style={{alignItems:"center",justifyContent:"space-between"}}>
                            <Text numberOfLines={1} style={{fontSize:16}}>
                                {item.name}
                            </Text>
                            <Text style={{fontSize:14,color:item.status==0?"#DD5144":"#999",textAlign:"right"}}>
                                { item.status==0?"待审核":"已审核" }
                            </Text>
                        </Row>
                        <Row style={{alignItems:"center"}}>
                            <Icon name="clock" type="Feather" style={{fontSize:16,color:"#999"}}></Icon>
                            <Text style={{fontSize:14,color:"#666",marginLeft:6}}>
                                {timetrans(item.timeStamp)}
                            </Text>
                        </Row>
                    </Col>
                    <Col  style={{width:22,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                        <Icon active name="chevron-small-right" type="Entypo" style={{color:"#DD5144"}}></Icon>
                    </Col>
                </Grid>
            )
        }


        return (
            <TouchableOpacity  style={styles.container} onPress={() =>{onPressFn()}}>
                <View style={styles.container}>
                    {
                        style1()
                    }
                </View>
            </TouchableOpacity>


        );
    }
}