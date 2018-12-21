/**
 * Created by kurosaki on 2018/12/1.
 */
import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import {
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';

const styles = {
    newshead:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:14,
        paddingTop:2,
        paddingBottom:2,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
        backgroundColor:"#ffffff"
    }
}

export default class Titles extends Component<Props> {
    constructor(props){
        super(props);
    }


    render() {
        let {titles,clickFn,borderTop} = this.props;
        return (
            <TouchableNativeFeedback  onPress={()=>{clickFn()}}>
                <View style={[styles.newshead,{borderTopColor:"#f0f0f0",borderTopWidth:borderTop?1:0}]}>
                    <View style={{flex:1,height:28,borderLeftColor:"#fc3838",borderLeftWidth:4,paddingLeft:10}}>
                        <Text style={{fontSize:18,color:"#333",lineHeight:28,fontWeight:"bold"}}>
                            {titles}
                        </Text>
                    </View>
                    <Button full rounded transparent dark style={{marginRight:-14}} onPress={()=>{clickFn()}}>
                        <Icon name="chevron-small-right" type="Entypo" style={{color:"#666"}}/>
                    </Button>
                </View>
            </TouchableNativeFeedback>
        );
    }
}