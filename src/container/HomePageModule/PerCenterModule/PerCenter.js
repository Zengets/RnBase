/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import { Container, Header, Content, H1, H2, H3 } from 'native-base';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
const styles = {
    container: {
        flex: 1,
    },
}
export default class PerCenter extends Component<Props> {
    render() {
        return (
            <Container>
                <ScrollView>
                    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                        <Text>
                            Percenter
                        </Text>
                    </SafeAreaView>
                </ScrollView>
            </Container>
        );
    }
}


