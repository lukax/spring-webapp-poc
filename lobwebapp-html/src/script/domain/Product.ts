///<reference path="../reference.d.ts"/>

module domain {
    export interface Product extends domain.base.AbstractEntity {
        name: string;
        description: string;
        price: number;
        costPrice: number;
        category: string;
        ncm: string;
        registerDate: number;
    }
}