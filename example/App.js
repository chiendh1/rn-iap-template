import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IapKit from 'react-native-iap-kit';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }

  render() {
    return (
      <View>
        <IapKit visible={false} theme="theme1" />
      </View>
    );
  }
}
