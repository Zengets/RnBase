import React from "react";
import { LargeList } from "react-native-largelist-v2";
import { Container, Header, Left, Body, Right, Button, Icon, SwipeRow, Content ,Picker } from 'native-base';
import { StyleSheet, Text, View,TextInput } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Cost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selected:"2018",
            costArr:[]
        }
    }



    componentDidMount(){

    }
    onValueChange(value: string) {
        this.setState({
            selected: value,
            costArr:[]
        });
    }

    render() {
        let picker = ()=>{
            return(
                <Picker
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#DD5144" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>选择年份</Title>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item label={"2017"} value={"2017"} />
                    <Picker.Item label={"2018"} value={"2018"} />
                </Picker>)
        }
        return (
            <Container>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>党费缴纳</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <Text style={{color:"#fff",fontSize:14}}>党费说明</Text>
                    </Right>
                </Header>
                <Content>
                    <View style={{padding:14,paddingTop:0,paddingBottom:0}}>
                        <Grid style={{borderBottomColor:"#f0f0f0",borderBottomWidth:1}}>
                            <Col size={3}>
                                <Text style={{lineHeight:50,fontSize:16}} onPress={()=>{alert(0)}}>
                                    选择年份：
                                </Text>
                            </Col>
                            <Col size={1.4}>
                                {picker()}
                            </Col>
                        </Grid>
                        <Grid>
                            <Row>
                                <Col>
                                    <Button full iconLeft style={{justifyContent:"center",alignItems:"center"}}>
                                        <Icon name='home' style={{marginLeft:-6}}/>
                                        <Text style={{color:"#fff"}}> Home</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button full iconLeft style={{justifyContent:"center",alignItems:"center"}}>
                                        <Icon name='home' style={{marginLeft:-6}}/>
                                        <Text style={{color:"#fff"}}> Home</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button full iconLeft style={{justifyContent:"center",alignItems:"center"}}>
                                        <Icon name='home' style={{marginLeft:-6}}/>
                                        <Text style={{color:"#fff"}}> Home</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button full iconLeft style={{justifyContent:"center",alignItems:"center"}}>
                                        <Icon name='home' style={{marginLeft:-6}}/>
                                        <Text style={{color:"#fff"}}> Home</Text>
                                    </Button>
                                </Col>

                            </Row>
                            <Row>

                            </Row>
                            <Row>

                            </Row>




                        </Grid>



                    </View>

                </Content>
            </Container>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

});