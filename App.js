import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/core/store/store';
import AppNavigator from "./src/navigation/navigation"
import { Root } from "native-base";
import {
    StatusBar
} from 'react-native';

export default class App extends Component<Props> {
  componentDidMount(){
      setTimeout(()=>{
          StatusBar.setBackgroundColor('#DD5144')
      },100)
  }

  render() {
    return (
        <Root>
            <Provider store={store}>
              <AppNavigator></AppNavigator>
            </Provider>
        </Root>
    );
  }
}