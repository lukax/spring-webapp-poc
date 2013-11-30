///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Product extends domain.base.AbstractEntity {
        name: string;
        price: number;
        quantity: number;
        description?: string;
        unit?: string;
        costPrice?: number;
        category?: string;
        ncm?: string;
        date?: Date;
    }
}