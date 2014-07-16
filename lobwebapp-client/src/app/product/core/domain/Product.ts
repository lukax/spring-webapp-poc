///<reference path="../../../reference.ts"/>

module product.core {
    export interface Product extends entity.AbstractEntity {
        name: string;
        description: string;
        price: number;
        costPrice: number;
        category: string;
        ncm: string;
    }
}
