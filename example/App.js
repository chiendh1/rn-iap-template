import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IapKitScreen, {IapKit} from 'react-native-iap-kit';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    IapKit.init(
      {skus: []},
      () => {},
      () => {},
    );
  }

  render() {
    return (
      <View>
        <IapKitScreen visible={false} theme="theme1" />
      </View>
    );
  }
}
