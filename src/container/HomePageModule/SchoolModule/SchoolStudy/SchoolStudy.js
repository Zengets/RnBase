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
import { withNavigation } from 'react-navigation';

const { width,height } = Dimensions.get('window')
const styles={

}
class SchoolStudy extends Component<Props> {
    constructor(props){
        super(props);
        this._scrollobj = null;
        this.state={
            course:[{
                id:0,
                name:"NativeBase",
                imgurl:require("../../../../assets/images/tts1.png")
            },{
                id:1,
                name:"ReactNative",
                imgurl:require("../../../../assets/images/tts0.png")
            },{
                id:2,
                name:"ReactWeb",
                imgurl:require("../../../../assets/images/tts2.png")
            },{
                id:3,
                name:"ReactVr",
                imgurl:require("../../../../assets/images/tts1.png")
            }],
            vedios:[{
                id:3,
                name:"NativeBase",
                imgurl:require("../../../../assets/images/tts2.png")
            },{id:4,
                name:"ReactNative",
                imgurl:require("../../../../assets/images/tts1.png")
            },{id:5,
                name:"ReactWeb",
                imgurl:require("../../../../assets/images/tts0.png")
            },{id:6,
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
            <ScrollView style={{backgroundColor:"#f9f9f9"}} ref={(component) => {this._scrollobj = component}} showsVerticalScrollIndicator={false}>
                    <View>
                        <Titles titles={"课程(20)"} clickFn={()=>{
                            this.props.navigation.navigate("SchoolNav",{
                                type:0,
                            })
                        }}></Titles>
                        <View style={{flexDirection:"row",flexWrap:"wrap",paddingTop:0.02*width,paddingBottom:0.02*width}}>
                            {
                                course.map((item,i)=>{
                                    return(
                                    <TouchableNativeFeedback key={i}  onPress={()=>{
                                            this.props.navigation.navigate("SchoolBook",{
                                                id: item.id,
                                                title:item.name
                                            })
                                    }}>
                                        <View style={{width:width*0.47,marginLeft:0.02*width,backgroundColor:"#fff",marginBottom:0.02*width}}>
                                            <Card transparent style={{padding:0,margin:0}}>
                                                <CardItem cardBody>
                                                    <Image source={item.imgurl} style={{height: 120, width: width*0.47, flex: 1}}/>
                                                </CardItem>
                                                <CardItem>
                                                    <Text numberOfLines={1} style={{textAlign:"left"}}>{item.name}</Text>
                                                </CardItem>
                                            </Card>
                                        </View>
                                    </TouchableNativeFeedback>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View>
                        <Titles borderTop={true} titles={"视频(20)"} clickFn={()=>{
                            this.props.navigation.navigate("SchoolNav",{
                                type:1,
                            })
                        }}></Titles>
                        <View style={{flexDirection:"row",flexWrap:"wrap",paddingTop:0.02*width,paddingBottom:0.02*width}}>
                            {
                                vedios.map((item,i)=>{
                                    return(
                                        <TouchableNativeFeedback key={i}  onPress={()=>{
                                            this.props.navigation.navigate("SchoolBook",{
                                                id: item.id,
                                                title:item.name
                                            })
                                    }}>
                                        <View style={{width:width*0.47,marginLeft:0.02*width,backgroundColor:"#fff",marginBottom:0.02*width}}>
                                            <Card transparent style={{padding:0,margin:0}}>
                                                <CardItem cardBody>
                                                    <Image source={item.imgurl} style={{height: 120, width: width*0.47, flex: 1}}/>
                                                </CardItem>
                                                <CardItem>
                                                    <Text numberOfLines={1} style={{textAlign:"left"}}>{item.name}</Text>
                                                </CardItem>
                                            </Card>
                                        </View>
                                    </TouchableNativeFeedback>
                                    )
                                })
                            }
                        </View>
                    </View>



            </ScrollView>


        );
    }
}
export default withNavigation(SchoolStudy)
