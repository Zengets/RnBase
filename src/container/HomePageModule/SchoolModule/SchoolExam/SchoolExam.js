/**
 * Created by kurosaki on 2018/12/1.
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content ,Card, CardItem,Picker,ListItem } from 'native-base';
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
import { Titles,SchoolExamItem } from '../../../../components'
import { withNavigation } from 'react-navigation';
const { width,height } = Dimensions.get('window')
const styles={

}
class SchoolExam extends Component<Props> {
    constructor(props){
        super(props);
        this._scrollobj = null;
        this.state={
            selected: "待考",
            testArr:[{
                id:Math.ceil(Math.random() * 100),exam:"试卷1",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),exam:"试卷2",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),exam:"试卷3",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),exam:"试卷4",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),exam:"试卷5",
                time:"2017-08-01",
            },]
        }
    }
    scrollToTops(){
        this._scrollobj.scrollTo({x: 0, y: 0, animated: true})
    }
    componentDidMount(){
        this.props.onRef(this)
    }
    onValueChange(value: string) {
        let arr1=[{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷1",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷2",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷3",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷4",
                time:"2017-08-01",
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷5",
                time:"2017-08-01",
            },],arr2=[{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷1",
                time:"2017-09-01",
                status:0
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷2",
                time:"2017-09-01",
                status:1
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷3",
                time:"2017-09-01",
                status:1
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷4",
                time:"2017-09-01",
                status:0
            },{
                id:Math.ceil(Math.random() * 100),
                exam:"试卷5",
                time:"2017-09-01",
                status:1
            }]

        this.setState({
            selected: value,
            testArr:value=="待考"?arr1:arr2
        });
    }
    render() {
        let { selected,testArr } = this.state;

        let picker = ()=>{
            return(
                <Picker
                renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="chevron-small-left" type="Entypo" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>选择试卷</Title>
                          </Body>
                          <Right />
                        </Header>}
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
            >
                <Picker.Item label="待考" value="待考" />
                <Picker.Item label="已考" value="已考" />
            </Picker>)
        }

        return (
            <ScrollView ref={(component) => {this._scrollobj = component}} showsVerticalScrollIndicator={false}>
                <View>
                    <ListItem icon>
                        <Left style={{width:32}}>
                            <Button style={{ backgroundColor:selected=="待考"? "#DD5144":"lightgrey" }}>
                                <Icon type="FontAwesome" name="list-alt" />
                            </Button>
                        </Left>
                        <Body style={{flex:2,paddingLeft:12}}>
                            <Text style={{fontSize:17,fontWeight:"bold"}}>{selected}(20)</Text>
                        </Body>
                        <Right style={{flex:1,flexDirection:"row",justifyContent:"flex-end",marginRight:-10}}>
                            {picker()}
                        </Right>
                    </ListItem>
                </View>
                <View>
                    {
                        testArr.map((item,i)=>{
                            return(
                                <SchoolExamItem type={selected} key={i} item={item} pressFn={()=>{
                                    let url = selected=="待考"?"Exam":"ExamList"
                                    this.props.navigation.navigate(url,{
                                        id: item.id,
                                        title:item.exam,
                                        types:"0"
                                    })
                                }}></SchoolExamItem>
                            )
                        })
                    }



                </View>
            </ScrollView>
        );
    }
}
export default withNavigation(SchoolExam)
