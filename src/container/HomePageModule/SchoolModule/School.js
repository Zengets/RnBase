/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content } from 'native-base';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
   TouchableOpacity,     Animated,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Swiper from '@nart/react-native-swiper';
import SchoolStudy from './SchoolStudy/SchoolStudy';
import SchoolExam from './SchoolExam/SchoolExam';


const { width,height } = Dimensions.get('window')
const styles={
    imagehead:{
        width:36,
        height:36,
        borderRadius:600,
        overflow:"hidden"
    },
    maincover:{
        width:width,
        minHeight:height-140,
    },
    item:{
        width:width,
    }
}
export default class School extends Component<Props> {
    constructor(props){
        super(props);
        this._swiperobj=null;
        this.state={
           current:0
        }
    }
    _changeCurrent(key){
        if(key === this.state.current){
            return
        }
        this.setState({
            current:key
        });
        let index = key==0?-1:key;
        this._swiperobj.scrollBy(index);
        if(key==1){
            this.child.scrollToTops()
        }else{
            this.childs.scrollToTops()
        }


    }

    onRef = (ref) => {
        this.child = ref
    }

    onRefs = (ref) => {
        this.childs = ref
    }
    render() {
        let {current} = this.state;
        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}} hasSegment>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={styles.imagehead}>
                            <ImageBackground
                                style={{width:36,height:36}}
                                source={require('../../../assets/images/headtemp.jpg')}
                                resizeMode='cover'>
                            </ImageBackground>
                        </TouchableOpacity>

                    </Left>
                    <Body style={{flex:3,justifyContent:"center",alignItems:"center"}}>
                            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:600,backgroundColor:"#ffffff"}}>
                                    <Button onPress={()=>this._changeCurrent(0)} style={{width:80,height:28,borderRadius:600,justifyContent:"center",alignItems:"center",backgroundColor:current==0?"#DD5144":"#fff"}} full rounded transparent={current==0?false:true }>
                                        <Text style={{color:current==0?"#fff":"#DD5144",lineHeight:28}}>学习资源</Text>
                                    </Button>
                                    <Button onPress={()=>this._changeCurrent(1)} style={{width:80,height:28,borderRadius:600,justifyContent:"center",alignItems:"center",backgroundColor:current==0?"#fff":"#DD5144",borderWidth:0}} full rounded transparent={current==0?true:false}>
                                        <Text style={{color:"#fff",lineHeight:28,color:current==0?"#DD5144":"#fff"}}>在线考试</Text>
                                    </Button>
                            </View>
                    </Body>
                    <Right style={{flex:1}}>

                    </Right>
                </Header>
                <Content>
                    <Swiper style={styles.maincover} scrollsToTop={true} onIndexChanged={(index)=>{
                           this.setState({
                                current:index
                           })
                           if(index==1){
                                this.child.scrollToTops()
                           }else{
                               this.childs.scrollToTops()
                           }

                    }}  showsPagination={false}
                        loop={false}
                        ref={(component) => {this._swiperobj = component}} >
                        <View style={styles.item}>
                            <SchoolStudy onRef={this.onRef}></SchoolStudy>
                        </View>
                        <View style={styles.item}>
                            <SchoolExam onRef={this.onRefs}></SchoolExam>
                        </View>
                    </Swiper>

                </Content>
            </Container>
        );
    }
}

