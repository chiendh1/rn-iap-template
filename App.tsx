import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PremiumPopup from './src/theme1/premium.popup';

interface Props {}

interface State {
    visible: boolean;
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    private onPress = () => {
        this.setState({ visible: true });
    };

    public render(): React.ReactNode {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <TouchableOpacity
                    style={{ marginTop: 100 }}
                    onPress={this.onPress}
                >
                    <Text>Show premium</Text>
                </TouchableOpacity>
                <PremiumPopup visible={this.state.visible} />
            </View>
        );
    }
}
