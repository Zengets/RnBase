/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import { Container, Header, Content, H1, H2, H3 } from 'native-base';
import Swiper from 'react-native-swiper';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';
const { width } = Dimensions.get('window')
const styles = {
    container: {
        flex: 1
    },
    wrapper: {
        paddingBottom:32
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    }
}
export default class HomePage extends Component<Props> {
    render() {
        return (
            <Container>
                <Content>
                    <View style={{paddingBottom:32}}>
                        <Swiper
                            style={styles.wrapper} height={200}
                            onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            paginationStyle={{
                        bottom: -23, left: null, right: 10
                    }} loop autoplay>
                            <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts0.jpg')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                            <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts1.jpg')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                            <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                                <ImageBackground
                                    style={styles.image}
                                    source={require('../../assets/images/tts2.jpg')}
                                    resizeMode='cover'>
                                </ImageBackground>
                            </View>
                        </Swiper>
                    </View>
                    <Text>
                        to be continue...
                    </Text>


                </Content>
            </Container>

        );
    }
}