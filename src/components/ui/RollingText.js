/**
 * Created by kurosaki on 2019/1/10.
 */
import React, { Component } from "react"
import { View, Text, TouchableOpacity,Animated } from "react-native"

export default class RollingText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nowItem: {}, // 显示的文本
            opacity:  new Animated.Value(1), // 透明度
            list: [], // 滚动的列表
        }
        this.t = null;
        this.fadeOut = Animated.timing(                  // 随时间变化而执行动画
            this.state.opacity,            // 动画中的变量值
            {
                toValue: 0,                   // 透明度最终变为1，即完全不透明
                duration: 2500,              // 让动画持续一段时间
            }
        )
        this.fadeIn = Animated.timing(                  // 随时间变化而执行动画
            this.state.opacity,            // 动画中的变量值
            {
                toValue: 1,                   // 透明度最终变为1，即完全不透明
                duration: 2500,              // 让动画持续一段时间
            }
        )
    }

    componentWillMount() {
        const { list } = this.props
        this.setState({
            nowItem: list[0]?list[0]:"", // 插入显示的文本
            list, // 滚动的列表
        })
    }



    componentWillReceiveProps(nextProps){
        if(this.props.list!=nextProps.list){
            this.setState({
                list:nextProps.list
            })
            let n = 0,list = nextProps.list;
            if(list.length>1&&nextProps.plays){
                this.t = setInterval(()=>{
                    if(n<list.length-1){
                        n++;
                    }else{
                        n = 0;
                    }
                    this.setState({
                        nowItem: list[n]
                    })
                },4000)
            }else{
                clearInterval(this.t)
            }


        }
    }



    render() {
        const { nowItem, opacity,list } = this.state,
               { pressFn } = this.props;
        return (
            <View style={{ borderWidth: 1, margin: 10, padding: 5, borderColor: "transparent" }}>
                <TouchableOpacity activeOpacity={0.75} onPress={() => pressFn(nowItem)}>
                    <View style={{ width: "100%" }}>
                        <Text
                            style={{
                            opacity:list.length<2?1:opacity,
                            fontSize: 14,
                          }}
                            numberOfLines={1}
                        >
                            {nowItem.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}