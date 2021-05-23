import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import images from "../res/images";

interface Props {
  benefits: string[];
}

interface State {}

export default class InformationComponent extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.wrapper}>
        <Image
          resizeMode="contain"
          source={images.ic_vip}
          style={{ width: 100, height: 100 }}
        />

        <Text style={styles.headingStyle}>Unlimited Access</Text>
        <Text style={styles.subTitleStyle}>Get access to all our features</Text>

        <View style={styles.benefitWrapper}>
          {this.props.benefits.map((benefit) => {
            return (
              <View
                key={benefit}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Image style={styles.iconStyle} source={images.ic_check} />
                <Text style={{ fontSize: 15 }}>{benefit}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  benefitWrapper: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 30,
  },
  subTitleStyle: { fontSize: 14, fontWeight: "700" },
  headingStyle: { fontSize: 28, fontWeight: "bold" },
  wrapper: { alignItems: "center", marginTop: 10 },
});
