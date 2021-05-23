import * as React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
    Modal,
    ModalProps,
    Image,
    ScrollView
} from 'react-native';
import * as RNIap from 'react-native-iap';
import { Plan } from '../types/plan';
import { DimensionUtils } from '../utils/DimensionUtils';
import InformationComponent from './components/information.component';
import PlanComponent from './components/plan.component';
import images from './res/images';

interface Props {
    style?: StyleProp<ViewStyle>;
    onRestorePressed?: () => void;
    benefits: string[];
    plans: Plan[];
    visible?: boolean;
    onBackPressed?: () => void;
    modalProps?: Partial<ModalProps>;
}

interface State {
    skuSelected?: string;
}

export default class PremiumPopup extends React.Component<Props, State> {
    static defaultProps: Props = {
        benefits: [
            'Remove all ads',
            'Daily new content',
            'Other cool features'
        ],
        plans: [
            {
                duration: '1',
                unit: 'week',
                isRecommend: false,
                price: '$3.49',
                sku: '123',
                type: 'subs'
            },
            {
                duration: '3',
                unit: 'week',
                isRecommend: true,
                price: '$3.49',
                sku: '1233',
                type: 'subs'
            },
            {
                duration: '1',
                unit: 'week',
                isRecommend: false,
                price: '$3.49',
                sku: '12344',
                type: 'subs'
            }
        ]
    };

    constructor(props: Props) {
        super(props);

        const skuSelected = this.props.plans?.find(it => it.isRecommend);
        this.state = {
            skuSelected: skuSelected?.sku
        };
    }

    private onPlanPressed = (plan: Plan) => () => {
        this.setState({ skuSelected: plan.sku });
    };

    private onUpgradePressed = async () => {
        const item = this.props.plans.find(
            it => it.sku === this.state.skuSelected
        );

        if (!item) return;

        if (item.type === 'subs') {
            try {
                await RNIap.requestSubscription(item.sku);
            } catch (err) {
                console.warn(err.code, err.message);
            }
        } else if (item.type === 'product') {
            try {
                await RNIap.requestPurchase(item.sku, false);
            } catch (err) {
                console.warn(err.code, err.message);
            }
        }
    };

    private renderView() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        justifyContent: 'space-between'
                    }}
                >
                    <TouchableOpacity
                        onPress={this.props.onBackPressed}
                        activeOpacity={0.8}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={images.ic_back}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.props.onRestorePressed}
                    >
                        <Text style={{ fontWeight: '600' }}>Restore</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <InformationComponent benefits={this.props.benefits} />

                    <View style={styles.dividerStyle} />

                    <PlanComponent
                        skuSelected={this.state.skuSelected}
                        onPlanPressed={this.onPlanPressed}
                        plans={this.props.plans}
                    />

                    <TouchableOpacity
                        onPress={this.onUpgradePressed}
                        activeOpacity={0.8}
                        style={styles.ctaWrapper}
                    >
                        <Text style={styles.labelStyle}>Continue</Text>
                    </TouchableOpacity>

                    <Text
                        style={{
                            paddingHorizontal: 15,
                            marginTop: 15,
                            fontSize: 10
                        }}
                    >
                        Payment will be charged to your Google Play account at
                        the end of your free trial or confirmation of purchase
                        if you are not starting a trial. Subscription will
                        automatically renew unless it is cancelled at least 24
                        hours before the end of your trial or current period.
                        Your account will be charged for renewal within 24 hours
                        prior to the end of the current period. You can manage
                        or cancel the subscriptions at any time in Google Play
                        settings.
                    </Text>
                </ScrollView>
            </View>
        );
    }

    public render(): React.ReactNode {
        return (
            <Modal
                onRequestClose={this.props.onBackPressed}
                animationType="slide"
                transparent
                statusBarTranslucent
                visible={this.props.visible}
                // @ts-ignore
                {...this.props.modalProps}
            >
                {this.renderView()}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    labelStyle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15
    },
    ctaWrapper: {
        backgroundColor: 'rgb(255, 148, 27)',
        marginHorizontal: 30,
        height: 40,
        marginTop: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dividerStyle: {
        marginHorizontal: 35,
        height: 1,
        marginVertical: 20,
        backgroundColor: '#d6d6d6'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: DimensionUtils.getStatusBarHeight()
    }
});
