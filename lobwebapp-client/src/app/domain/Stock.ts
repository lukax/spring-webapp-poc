///<reference path="../reference.ts"/>

module domain {
    export interface Stock extends domain.base.AbstractEntity {
        product: domain.Product;
        quantity: number;
        minQuantity: number;
        maxQuantity: number;
        unit: string;
    }
}