import { Dimensions, Platform } from 'react-native';

export class DimensionUtils {
    static getStatusBarHeight(safe = true): number {
        return Platform.select({
            ios: this.ifIphoneX(safe ? 44 : 30, 20),
            android: 0,
            default: 0
        });
    }

    static getScreenWidth(): number {
        return Dimensions.get('window').width;
    }

    static getScreenHeight(): number {
        return Dimensions.get('window').height;
    }

    static ifIphoneX(
        iPhoneXHeight: number,
        iPhoneNormalHeight: number
    ): number {
        if (this.isIphoneX()) {
            return iPhoneXHeight;
        }
        return iPhoneNormalHeight;
    }

    static isIphoneX(): boolean {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (dimen.height === 780 ||
                dimen.width === 780 ||
                dimen.height === 812 ||
                dimen.width === 812 ||
                dimen.height === 844 ||
                dimen.width === 844 ||
                dimen.height === 896 ||
                dimen.width === 896 ||
                dimen.height === 926 ||
                dimen.width === 926)
        );
    }

    static getBottomSpace(): number {
        return this.isIphoneX() ? 34 : 0;
    }
}
