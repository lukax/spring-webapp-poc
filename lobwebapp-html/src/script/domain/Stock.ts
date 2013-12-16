///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Stock extends domain.base.AbstractEntity {
        product: domain.Product;
        quantity: number;
        unit: string;
    }
}