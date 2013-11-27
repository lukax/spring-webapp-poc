/**
 * Created by lucas on 10/25/13.
 */
///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Order extends domain.base.AbstractEntity {
        customer: domain.Customer;
        products: domain.Product[];
        payment: Payment;
        date?: Date;
    }
}