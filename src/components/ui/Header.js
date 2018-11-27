/**
 * Created by kurosaki on 2018/9/3.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
let {height,width} =  Dimensions.get('window');
const styles = StyleSheet.create({
    default: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#a3aadb",
        height:46,
        position:"relative",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    danger: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e03939',
        height:46,
        position:"relative",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    primary: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5439dc',
        height:46,
        position:"relative",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    back:{
        width:16,
        height:16,
    },
    welcome: {
        position:"absolute",
        width: width*0.74,
        height:46,
        left:width*0.13
    },
    btn:{
        width:16,
        height:16,
    }

});

class Header extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            title:props.title
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.title != this.props.title){
            this.setState({
                title : nextProps.title
            })
        }
    }


    render() {
        let {color,navigation,btns,clickFn} = this.props;
        let {title} = this.state,type=0,desc='';
        if(btns){
            type = btns.type;
            desc = btns.desc;
        }
        return (
            <View style={
                    color=="default"?
                    styles.default:
                    color=="danger"?
                    styles.danger:
                    color=="primary"?
                    styles.primary:
                    styles.default
                    }>
                <TouchableWithoutFeedback style={styles.back} onPress={()=>{ navigation.goBack() }}>
                    {
                        navigation?
                        <View style={{paddingLeft:12}}>
                            <Image style={styles.back} source={require('../../assets/images/back.png')}></Image>
                        </View>:
                        <View style={{paddingLeft:12}}>

                        </View>
                    }
                </TouchableWithoutFeedback>
                <View style={styles.welcome} >
                    <Text style={{
                        fontSize: 20,
                        lineHeight:46,
                        textAlign: 'center',
                        color:"#ffffff"}}>
                        {title}
                    </Text>
                </View>
                <TouchableWithoutFeedback style={styles.back} onPress={()=>{ clickFn() }}>
                    {
                        type?
                        type==1?
                            <View style={{paddingRight:12}}>
                                <Text style={{color:"#ffffff"}}>{desc}</Text>
                            </View>
                        :
                        <View style={{paddingRight:12}}>
                            <Image style={{width:30,height:30}} source={desc}></Image>
                        </View>
                        :
                        <View style={{paddingRight:12}}></View>
                    }
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.title,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        onSwitchTiT: (key) => {
            dispatch({type:'CHANGE_TIT',title:key})
        },
    }
}
Header = connect(mapStateToProps,mapDispatchToProps)(Header);

export default Header