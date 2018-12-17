/**
 * Created by kurosaki on 2018/12/14.
 */
import React, { Component } from 'react';
import { Container, Header,Content, Left, Body, Right, Button, Icon,Picker,ListItem } from 'native-base';
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
    WebView,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const { width,height } = Dimensions.get('window')
const styles={
    heads:{
        backgroundColor:"#DD5144"
    },
    backgroundVideo:{
        width:width,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
    titles:{
        padding:14,
        fontSize:18,
        backgroundColor:"#f0f0f0",
        color:"#333"
    },
    bodys:{
        flex:1,
        padding:14,
        backgroundColor:"#f9f9f9",
        lineHeight:24
    }
}
class SchoolVideo extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            id:props.navigation.getParam('id', 'NO-ID'),//genid
            title:props.navigation.getParam('title', 'NO-ID'),//gentitle
            testArr:{
                source :'http://218.2.128.222:18085/ftp/dangjian/StudyMaterial/file/58e68a146563445e97755dae034d141a.mp4',
                desc: "这里是视频描述"
            },
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            heightAnim: new Animated.Value(height*0.3),
        }
        this.marginIn =  Animated.timing(
            this.state.heightAnim,
            {
                toValue: height-68,
                duration: 500,
            }
        );
        this.marginOut =  Animated.timing(
            this.state.heightAnim,
            {
                toValue: height*0.3,
                duration: 500,
            }
        );
    }
    onSeek = seek => {
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onReplay = () => {
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };

    onLoad = data => this.setState({ duration: data.duration, isLoading: false });

    onLoadStart = data => {
        this.setState({ isLoading: true });
    }

    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

    onError = () => { ToastAndroid.show("视频加载失败...",ToastAndroid.SHORT)};

    onFullScreen = () => {
        this.setState({ isFullScreen:!this.state.isFullScreen});
        if(!this.state.isFullScreen){
            this.videoPlayer.presentFullscreenPlayer();
            this.marginIn.start();
        }else{
            this.videoPlayer.dismissFullscreenPlayer()
            this.marginOut.start();
        }

    };



    onSeeking = currentTime => this.setState({ currentTime });

    componentWillUnMount(){
        this.setState({
            paused: true
        });
    }






    videoError
    render() {
        let { testArr,title,currentTime,duration,isFullScreen,isLoading,paused,playerState,heightAnim} = this.state;


        return (
            <Container style={{flex:1,position:"relative"}}>
                <Header style={styles.heads}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>视频详情</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                    <Animated.View style={[styles.backgroundVideo,{height:heightAnim}]}>
                        <Video source={{uri: testArr.source}}
                               onEnd={this.onEnd}
                               onLoad={this.onLoad}
                               onLoadStart={this.onLoadStart}
                               onProgress={this.onProgress}
                               fullscreen = {isFullScreen}
                               paused={paused}
                               volume={0.0}
                               ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                               resizeMode="contain"
                               style={styles.mediaPlayer}
                               controls={false}
                               poster="http://www.w3school.com.cn/i/eg_tulip.jpg"
                               bufferConfig={{
                                  minBufferMs: 15000,
                                  maxBufferMs: 50000,
                                  bufferForPlaybackMs: 2500,
                                  bufferForPlaybackAfterRebufferMs: 5000
                               }}
                               onError={this.onError}
                        />
                        <MediaControls
                            duration={duration}
                            isLoading={isLoading}
                            isFullScreen = {isFullScreen}
                            mainColor="orange"
                            onFullScreen={this.onFullScreen}
                            onPaused={this.onPaused}
                            onReplay={this.onReplay}
                            onSeek={this.onSeek}
                            onSeeking={this.onSeeking}
                            playerState={playerState}
                            progress={currentTime}
                        />
                    </Animated.View>


                    <Text style={styles.titles}>
                        {title}
                    </Text>
                    <Text style={styles.bodys}>
                        {testArr.desc}
                    </Text>
                    {
                        isFullScreen?null:
                        <View style={{position:"absolute",bottom:14,width:width,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <Text numberOfLines={1} style={{flex:1,paddingLeft:14,textAlign:"left",fontSize:12}}>
                                上一个 : {title}
                            </Text>
                            <Text numberOfLines={1} style={{flex:1,paddingRight:14,textAlign:"right",fontSize:12}}>
                                下一个 : {title}
                            </Text>
                        </View>



                    }

            </Container>
        );
    }
}


export default SchoolVideo
