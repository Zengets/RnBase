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

export default class ModalBottom extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleModal: props.show,
            scrollOffset:0
        };
    }

    componentWillReceiveProps(nextprops){
        this.setState({
            visibleModal:nextprops.show
        })
    }

    handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y
        });
    };

    handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };

    render() {
        let {pressFn,renderFn} = this.props;

        return (
            <Modal
                isVisible={this.state.visibleModal}
                onBackdropPress={() => this.setState({ visibleModal: false })}
                onSwipe={() => this.setState({ visibleModal: false })}
                swipeDirection="down"
                scrollTo={this.handleScrollTo}
                scrollOffset={this.state.scrollOffset}
                scrollOffsetMax={400 - 300} // content height - ScrollView height
                style={styles.bottomModal}
            >
                <View style={styles.scrollableModal}>
                    <ScrollView
                        ref={ref => (this.scrollViewRef = ref)}
                        onScroll={this.handleOnScroll}
                        scrollEventThrottle={16}
                        >
                        <View style={styles.scrollableModalContent1}>
                            {
                                renderFn()
                            }
                        </View>
                    </ScrollView>
                </View>
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
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    scrollableModal: {
        height: 300,
        backgroundColor:"#fff"
    },
    scrollableModalContent1: {
        height: 300,

    },

});