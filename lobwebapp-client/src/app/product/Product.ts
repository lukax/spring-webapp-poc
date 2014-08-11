///<reference path="../reference.ts"/>

module product {
    export interface Product extends core.AbstractEntity {
        name: string;
        description: string;
        price: number;
        costPrice: number;
        category: string;
        ncm: string;
    }
}
