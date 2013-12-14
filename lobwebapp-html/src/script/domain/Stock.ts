///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Stock extends domain.base.AbstractEntity {
        productId: number;
        quantity: number;
        unit: string;
    }
}