import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Plan } from '../../types/plan';

interface Props {
    plans: Plan[];
    skuSelected?: string;
    onPlanPressed: (plan: Plan) => () => void;
}

interface State {}

export default class PlanComponent extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    private renderRecommend = () => {
        return (
            <View style={styles.recommendWrapper}>
                <Text style={{ fontSize: 10, color: 'white' }}>Recommend</Text>
            </View>
        );
    };

    public render(): React.ReactNode {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.titleStyle}>Choose a plan</Text>

                <View style={styles.planWrapper}>
                    {this.props.plans.map(plan => {
                        const isSelected = plan.sku === this.props.skuSelected;
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={this.props.onPlanPressed(plan)}
                                key={plan.sku}
                                style={[
                                    styles.container,
                                    {
                                        width: plan.isRecommend ? '32%' : '28%',
                                        height: plan.isRecommend ? 135 : 120,
                                        borderWidth: isSelected ? 2 : 0,
                                        borderColor: isSelected
                                            ? 'rgb(255, 148, 27)'
                                            : undefined
                                    }
                                ]}
                            >
                                <Text
                                    style={{ fontSize: 28, fontWeight: 'bold' }}
                                >
                                    {plan.duration}
                                </Text>
                                <Text
                                    style={{ fontSize: 16, fontWeight: '600' }}
                                >
                                    {plan.unit}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: '600',
                                        marginTop: 5
                                    }}
                                >
                                    {plan.price}
                                </Text>

                                {plan.isRecommend && this.renderRecommend()}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={{ marginTop: 35 }}>
                    Trial period:{' '}
                    <Text style={{ fontWeight: '700' }}>3 days for FREE</Text>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    recommendWrapper: {
        position: 'absolute',
        top: -10,
        backgroundColor: 'rgb(255, 148, 27)',
        paddingHorizontal: 13,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        borderRadius: 12,
        marginHorizontal: 8,
        shadowColor: '#383838',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        backgroundColor: 'white',
        elevation: 5
    },
    planWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    wrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
