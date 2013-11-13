/**
 * Created by lucas on 10/25/13.
 */
///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface OrderStatus {
        delivery?: number;
        payment?: number;
    }

    export interface Order extends domain.base.AbstractEntity {
        client: string;
        products: domain.Product[];
        status: OrderStatus;
        date?: Date;
    }
}