export interface Plan {
    duration: string;
    unit: string;
    isRecommend: boolean;
    trial?: number;
    price: string;
    sku: string;
    type: 'subs' | 'product';
}
