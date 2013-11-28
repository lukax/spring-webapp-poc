///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Product extends domain.base.AbstractEntity {
        name: string;
        description: string;
        quantity: number;
        unit?: string;
        costPrice?: number;
        price: number;
        category?: string;
        ncm?: string;
        date?: Date;
    }
}