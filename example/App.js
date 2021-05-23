import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IapKit from '../src/iap-kit.tsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <IapKit theme="theme1" />
      </View>
    );
  }
}
