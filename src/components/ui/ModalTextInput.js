/**
 * Created by kurosaki on 2018/12/4.
 *
 */
import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
    Dimensions
} from "react-native";
import Modal from "react-native-modal";
import { Input,Item,Label} from 'native-base';


const { width,height } = Dimensions.get('window')
export default class ModalTextInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleModal: props.show,
            inputval:props.value?props.value:null
        };
    }


    renderButton = (text, onPress) => (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.button}>
                <Text style={{color:"#ff0000"}}>{text}</Text>
            </View>
        </TouchableNativeFeedback>
    );


    renderModalContent = (str,btnstr) => (
        <View style={styles.modalContent}>
            <View style={{paddingTop:16,width:0.8*width}}>
                <Item floatingLabel>
                    <Label>{str}</Label>
                    <Input
                        keyboardType={this.props.type=="number"?"number-pad":"default"}
                        onChangeText={(val) => {
                            if(this.props.type=="number"){
                                const newText = val.replace(/[^\d.]/g, '');
                                this.setState({inputval:newText})
                            }else{
                                this.setState({inputval:val})
                            }

                        }}
                        value={this.state.inputval}
                        clearButtonMode="always"
                    />
                </Item>
            </View>
            {this.renderButton(btnstr, () => {
                let vals
                if(this.props.type=="number"){
                    vals = this.state.inputval? parseFloat(this.state.inputval).toFixed(1):0
                }else{
                    vals = this.state.inputval? this.state.inputval:""
                }
                this.props.pressFn(vals);
            })}
        </View>
    );
    componentWillReceiveProps(nextprops){
        this.setState({
            visibleModal:nextprops.show,
            inputval:nextprops.value?nextprops.value:null
        })
    }



    render() {
        let {str,btnstr,pressFn,type} = this.props;

        return (
            <Modal
                isVisible={this.state.visibleModal}
                onBackdropPress={() => this.setState({ visibleModal: false })}
                onSwipe={() => this.setState({ visibleModal: false })}
                swipeDirection="down"
            >
                {this.renderModalContent(str,btnstr)}
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width:width*0.8,
        padding: 8,
        marginTop: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        paddingBottom:8
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        borderColor: "rgba(0, 0, 0, 0.1)",
        paddingBottom:22
    },
});