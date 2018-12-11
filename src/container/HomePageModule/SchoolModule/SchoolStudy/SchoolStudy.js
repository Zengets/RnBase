/**
 * Created by kurosaki on 2018/12/1.
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content ,Card, CardItem, } from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Animated,
    TouchableNativeFeedback
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Swiper from '@nart/react-native-swiper';
import { Titles } from '../../../../components'

const { width,height } = Dimensions.get('window')
const styles={

}
export default class SchoolStudy extends Component<Props> {
    constructor(props){
        super(props);
        this._scrollobj = null;
        this.state={
            course:[{
                name:"NativeBase",
                imgurl:require("../../../../assets/images/tts1.png")
            },{
                name:"ReactNative",
                imgurl:require("../../../../assets/images/tts0.png")
            },{
                name:"ReactWeb",
                imgurl:require("../../../../assets/images/tts2.png")
            },{
                name:"ReactVr",
                imgurl:require("../../../../assets/images/tts1.png")
            }],
            vedios:[{
                name:"NativeBase",
                imgurl:require("../../../../assets/images/tts2.png")
            },{
                name:"ReactNative",
                imgurl:require("../../../../assets/images/tts1.png")
            },{
                name:"ReactWeb",
                imgurl:require("../../../../assets/images/tts0.png")
            },{
                name:"ReactVr",
                imgurl:require("../../../../assets/images/tts1.png")
            }],
        }
    }
    scrollToTops(){
        this._scrollobj.scrollTo({x: 0, y: 0, animated: true})
    }
    componentDidMount(){
        this.props.onRef(this)
    }

    render() {
        let { course,vedios } = this.state;
        return (
            <ScrollView ref={(component) => {this._scrollobj = component}} showsVerticalScrollIndicator={false}>
                    <View>
                        <Titles titles={"课程(20)"} clickFn={()=>{alert(0)}}></Titles>
                        <View style={{flexDirection:"row",flexWrap:"wrap",paddingTop:0.02*width,paddingBottom:0.02*width}}>
                            {
                                course.map((item,i)=>{
                                    return(
                                        <Card key={i} style={{width:width*0.47,marginLeft:0.02*width}}>
                                            <CardItem cardBody>
                                                <Image source={item.imgurl} style={{height: 120, width: null, flex: 1}}/>
                                            </CardItem>
                                            <CardItem>
                                                <Text numberOfLines={1} style={{textAlign:"left"}}>{item.name}</Text>
                                            </CardItem>
                                        </Card>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View>
                        <Titles borderTop={true} titles={"视频(20)"} clickFn={()=>{alert(0)}}></Titles>
                        <View style={{flexDirection:"row",flexWrap:"wrap",paddingTop:0.02*width,paddingBottom:0.02*width}}>
                            {
                                vedios.map((item,i)=>{
                                    return(
                                        <Card key={i} style={{width:width*0.47,marginLeft:0.02*width}}>
                                            <CardItem cardBody>
                                                <Image source={item.imgurl} style={{height: 120, width: null, flex: 1}}/>
                                            </CardItem>
                                            <CardItem>
                                                <Text numberOfLines={1} style={{textAlign:"left"}}>{item.name}</Text>
                                            </CardItem>
                                        </Card>
                                    )
                                })
                            }
                        </View>
                    </View>



            </ScrollView>


        );
    }
}

