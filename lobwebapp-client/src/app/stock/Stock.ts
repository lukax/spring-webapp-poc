///<reference path="../reference.ts"/>

module stock {
    export interface Stock extends core.AbstractEntity {
        product: product.Product;
        quantity: number;
        minQuantity: number;
        maxQuantity: number;
        unit: string;
    }
}
