import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';
import {
    InAppPurchase,
    ProductPurchase,
    PurchaseError,
    purchaseErrorListener,
    purchaseUpdatedListener,
    SubscriptionPurchase
} from 'react-native-iap';
import { ReceiptValidationResponse } from 'react-native-iap/src/types/apple';

class IapKit {
    canMakePayments = true;

    purchaseUpdateSubscription?: any;

    purchaseErrorSubscription?: any;

    iOSSecretKey?: string;

    constructor() {}

    async init(
        opts: { skus: string[] },
        onSuccess?: () => {},
        onFailed?: () => void
    ) {
        try {
            const status = await RNIap.initConnection();

            if (Platform.OS === 'android') {
                await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
            }

            // On ios initConnection will return the result of canMakePayments
            if (Platform.OS === 'ios' && !status) {
                this.canMakePayments = false;
            }

            if (!this.canMakePayments) {
                console.warn('cannot make payments');
            }

            this.purchaseUpdateSubscription = purchaseUpdatedListener(
                async (
                    purchase:
                        | InAppPurchase
                        | SubscriptionPurchase
                        | ProductPurchase
                ) => {
                    console.log('purchaseUpdatedListener', purchase);
                    const receipt = purchase.transactionReceipt;
                    if (receipt) {
                        if (Platform.OS === 'ios') {
                            await RNIap.finishTransactionIOS(
                                purchase.transactionId!
                            );
                        } else if (Platform.OS === 'android') {
                            // If not consumable
                            await RNIap.acknowledgePurchaseAndroid(
                                purchase.purchaseToken!
                            );
                        }
                        await RNIap.finishTransaction(purchase, false);

                        onSuccess?.();
                    }
                }
            );

            this.purchaseErrorSubscription = purchaseErrorListener(
                (error: PurchaseError) => {
                    console.warn('purchaseErrorListener', error);
                    onFailed?.();
                }
            );
        } catch (err) {
            console.warn(err.message);
        }

        await RNIap.getProducts(opts.skus);
    }

    destroy() {
        this.purchaseUpdateSubscription?.remove();
        this.purchaseUpdateSubscription = null;
        this.purchaseErrorSubscription?.remove();
        this.purchaseErrorSubscription = null;
    }

    async restorePurchase(
        iOSPassword?: string,
        onSuccess?: () => void,
        onFailed?: () => void
    ) {
        if (Platform.OS === 'android') {
            const purchases = await RNIap.getAvailablePurchases();

            if (purchases.length > 0 && purchases[0].purchaseToken) {
                onSuccess?.();
            } else {
                onFailed?.();
            }
            return;
        }

        if (Platform.OS === 'ios') {
            const availablePurchases = await RNIap.getAvailablePurchases();

            const sortedAvailablePurchases = availablePurchases.sort(
                (a, b) => b.transactionDate - a.transactionDate
            );

            if (availablePurchases.length === 0) {
                return false;
            }

            const latestAvailableReceipt =
                sortedAvailablePurchases[0].transactionReceipt;

            const isTestEnvironment = __DEV__;
            const decodedReceipt: ReceiptValidationResponse | false =
                await RNIap.validateReceiptIos(
                    {
                        'receipt-data': latestAvailableReceipt,
                        password: iOSPassword
                    },
                    isTestEnvironment
                );

            if (!decodedReceipt) return false;

            if (decodedReceipt.status) {
                return false;
            }
            const { latest_receipt_info: latestReceiptInfo }: any =
                decodedReceipt;

            const isSubValid = !!latestReceiptInfo.find((receipt: any) => {
                const expirationInMilliseconds = Number(
                    receipt.expires_date_ms
                );
                const nowInMilliseconds = Date.now();
                return expirationInMilliseconds > nowInMilliseconds;
            });

            if (isSubValid) {
                onSuccess?.();
            } else {
                onFailed?.();
            }
        }
    }
}

export default new IapKit();
