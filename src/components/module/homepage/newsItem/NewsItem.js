/**
 * Created by kurosaki on 2018/11/29.
 */
import React, { Component } from 'react';
import {  Container} from 'native-base';
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
    },
    grid:{
        paddingTop:14,
        paddingBottom:14,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
    },
    imgbac:{
        width:80,
        height:80,
    }

}
export default class NewsItem extends React.PureComponent{
    render() {
        let {item,pressFn} = this.props;
        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Col size={1} style={{height:80,justifyContent:"space-between"}}>
                        <Row size={4}>
                            <Text numberOfLines={2} style={{fontSize:16,color:"#000"}}>
                                {item.title}
                            </Text>
                        </Row>
                        <Row size={1}>
                            <Col size={1}>
                                <Text style={{fontSize:14,color:"#999"}}>
                                    {item.from}
                                </Text>
                            </Col>
                            <Col size={1}>
                                <Text style={{textAlign:"right",fontSize:14,color:"#999"}}>
                                    {item.time}
                                </Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{width:80,marginLeft:14}}>
                        <ImageBackground
                            style={styles.imgbac}
                            resizeMode='cover'
                            source={item.pic[0].img}>
                        </ImageBackground>
                    </Col>
                </Grid>
            )
        }
        let style2 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Row style={{height:20}}>
                        <Text numberOfLines={1} style={{fontSize:16,color:"#000"}}>
                            {item.title}
                        </Text>
                    </Row>
                        <Row style={{height:80,marginTop:8,marginBottom:8,justifyContent:"space-between"}}>
                        {
                          item.pic.map((key,i)=>{
                              return(
                                  <Col key={i} size={1} style={{width:80}}>
                                      <ImageBackground
                                          style={{width:width/item.pic.length,height:80,}}
                                          resizeMode='cover'
                                          source={key.img}>
                                      </ImageBackground>
                                  </Col>
                              )
                          })
                        }
                    </Row>
                    <Row>
                        <Col size={1}>
                            <Text style={{fontSize:14,color:"#999"}}>
                                {item.from}
                            </Text>
                        </Col>
                        <Col size={1}>
                            <Text style={{textAlign:"right",fontSize:14,color:"#999"}}>
                                {item.time}
                            </Text>
                        </Col>
                    </Row>

                </Grid>
            )
        }

        return (
            <TouchableOpacity style={styles.container} onPress={()=>{pressFn()}}>
                <View style={styles.container}>
                    {
                        item.pic.length>1?
                        style2():
                        style1()
                    }
                </View>

            </TouchableOpacity>


        );
    }
}