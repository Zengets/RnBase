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
const { width,height } = Dimensions.get('window')
export default class Modals extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleModal: props.show
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
            <View style={{paddingBottom:8}}>
                <Text>{str}</Text>
            </View>
            {this.renderButton(btnstr, () => {
                this.setState({ visibleModal: false })
                this.props.pressFn();
            })}
        </View>
    );
    componentWillReceiveProps(nextprops){
        this.setState({
            visibleModal:nextprops.show
        })
    }



    render() {
        let {str,btnstr,pressFn} = this.props;

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
        borderTopColor:"#F0F0F0",
        borderTopWidth:1,
        width:width*0.8,
        padding: 16,
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