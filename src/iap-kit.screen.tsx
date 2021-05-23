import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { IAPProps } from "./iap-type";
import PremiumPopup from "./theme1/premium.popup";

interface State {}

export default class IapKitScreen extends React.PureComponent<IAPProps, State> {
  constructor(props: IAPProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactNode {
    if (this.props.theme === "theme1") {
      return <PremiumPopup {...this.props} />;
    }
    return null;
  }
}
