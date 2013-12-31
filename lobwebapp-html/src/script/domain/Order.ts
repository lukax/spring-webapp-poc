///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Order extends domain.base.AbstractEntity {
        customer: domain.Customer;
        items: domain.OrderItem[];
        payment: Payment;
        date: number;
    }

    export interface OrderItem {
        product: domain.Product;
        quantity: number;
    }
}