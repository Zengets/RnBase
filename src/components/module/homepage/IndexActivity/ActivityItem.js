/**
 * Created by kurosaki on 2018/12/7.
 */
import React, { Component } from 'react';
import {  Container,Icon,Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import {timetrans} from '../../../publicdata/Data'

const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,

    },
    grid:{
        flex:1,
        paddingTop:14,
        paddingBottom:14,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
        justifyContent:"center",
        alignItems:"flex-start"
    },
    cur:{
        borderColor:"#ff0000",
        borderWidth:1,
        borderRadius:6
    },
    curs:{
        borderColor:"#ddd",
        borderWidth:1,
        borderRadius:6
    }

}


export default class ActivityItem extends React.PureComponent{
    render() {
        let {item,onPressFn} = this.props;
        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Row >
                        <Text numberOfLines={1} style={{fontSize:16}}>
                            {item.title}
                        </Text>
                    </Row>
                    <Row style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <Col size={1.3} style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",borderRightColor:"#f0f0f0",borderRightWidth:1,marginRight:16}}>
                            <Image style={{opacity:0.5,width:15,height:15,marginRight:6}} source={require("../../../../assets/images/time.png")}></Image>
                            <Text numberOfLines={1} style={{fontSize:14,color:"#999"}}>
                                {timetrans(item.bgtime)}
                            </Text>
                        </Col>
                        <Col size={0.8} style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                            <Image style={{width:18,height:18}} source={require("../../../../assets/images/locations.png")}></Image>
                            <Text numberOfLines={1} style={{fontSize:14,textAlign:"right",color:"#999"}}>
                                {item.location}
                            </Text>
                        </Col>
                        <Col size={0.5} style={[item.end?styles.curs:styles.cur,{justifyContent:"center",alignItems:"center"}]}>
                            <Text style={{color:item.end?"#ddd":"#ff0000"}}>
                                {item.end?"已结束":"进行中"}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={{width:width,height:130,borderRadius:8}}>
                        <ImageBackground  resizeMode='cover' style={{width:width,height:130,borderRadius:8}} source={item.imgUrl?{uri:item.imgUrl}:require("../../../../assets/images/default.png")}>
                        </ImageBackground>
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