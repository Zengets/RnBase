/**
 * Created by kurosaki on 2018/12/7.
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

const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
        padding:14,
        paddingBottom:0
    },
    grid:{
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
        justifyContent:"center",
        alignItems:"center"
    },
}


export default class TemporaryItem extends React.PureComponent{
    render() {
        let {item,pressFn,onPressFn} = this.props;
        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Col size={1}>
                        <Row>
                            <Text numberOfLines={1} style={{fontSize:16}}>
                                {item.temppartyName}
                            </Text>
                        </Row>
                        <Row style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <Text numberOfLines={1} style={{fontSize:14,color:"#999"}}>
                                {item.temppartyTheme}
                            </Text>
                            <Text style={{fontSize:14,textAlign:"right",color:"#999"}}>
                                组织人员:{item.currentApplyCount}人
                            </Text>
                        </Row>
                    </Col>
                    <Col style={{width:60,marginLeft:20,height:30,borderLeftColor:"#f0f0f0",borderLeftWidth:1,justifyContent:"center",alignItems:"center",marginTop:-14}}>
                        <Button transparent onPress={() =>{pressFn()}}>
                            <Icon type="Entypo" name="phone" style={{color:"#34A34F"}}/>
                        </Button>
                    </Col>
                </Grid>
            )
        }


        return (
            <TouchableOpacity style={styles.container} onPress={() =>{onPressFn()}}>
                    {
                        style1()
                    }
            </TouchableOpacity>


        );
    }
}