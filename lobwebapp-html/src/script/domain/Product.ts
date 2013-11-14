///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Product extends domain.base.AbstractEntity {
        name: string;
        description: string;
        quantity: number;
        costPrice?: number;
        price: number;
        group?: string;
        ncm?: string;
        date?: Date;
        paymentMode?: number;
    }
}