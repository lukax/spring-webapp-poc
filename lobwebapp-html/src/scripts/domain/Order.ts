///<reference path="../reference.ts"/>

module domain {
    export interface Order extends domain.base.AbstractEntity {
        customer: domain.Customer;
        items: domain.OrderItem[];
        payment: domain.Payment;
        date: number;
    }

    export interface OrderItem {
        product: domain.Product;
        quantity: number;
    }
}