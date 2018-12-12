/**
 * Created by kurosaki on 2018/12/12.
 */

import React, { Component } from 'react';
import {  Container,Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
    },
    containers: {
        width:width*0.45,
        backgroundColor:"#ffffff",
        borderRadius:8,
        overflow:"hidden"
    },
    grid:{
        paddingTop:14,
        paddingBottom:14,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
    },
    grids:{
        flex:1,
        padding:0,
        backgroundColor:"#ffffff",
        borderRadius:8
    }
}



export default class SchoolListItem extends React.PureComponent{
    render() {
        let {item,pressFn,layout} = this.props;

        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Col style={{width:74}}>
                        <ImageBackground
                            style={{width:60,height:100,}}
                            resizeMode='cover'
                            source={item.imgUrl}>
                        </ImageBackground>
                    </Col>
                    <Col size={1}>
                        <Text numberOfLines={1} style={{fontSize:18,color:"#333",marginBottom:10}}>
                            {item.name}
                        </Text>
                        <Text numberOfLines={2} style={{fontSize:14,color:"#666"}}>
                            {item.desc}
                        </Text>
                    </Col>
                </Grid>
            )
        }

        let style2 = ()=>{
            return(
                <Grid style={styles.grids}>
                    <Row style={{width:width*0.45,height:width*0.5}}>
                        <ImageBackground
                            style={{width:width*0.45,height:width*0.5,}}
                            resizeMode='cover'
                            source={item.imgUrl}>
                        </ImageBackground>
                    </Row>
                    <Row size={1} style={{flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
                        <Text numberOfLines={1} style={{fontSize:16,color:"#333",marginTop:8,marginBottom:6,paddingLeft:4,paddingRight:4}}>
                            {item.name}
                        </Text>
                        <Text numberOfLines={2} style={{fontSize:14,color:"#666",paddingLeft:4,paddingRight:4}}>
                            {item.desc}
                        </Text>
                    </Row>
                </Grid>
            )
        }


        return (
            <TouchableNativeFeedback onPress={()=>{pressFn()}}>
                <View style={layout=="list"?styles.container:styles.containers}>
                    {
                        layout=="list"?
                        style1():
                        style2()
                    }
                </View>
            </TouchableNativeFeedback>


        );
    }
}