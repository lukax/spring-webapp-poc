///<reference path="../reference.ts"/>

module order {
    export interface Order extends core.AbstractEntity {
        customer: customer.Customer;
        items: OrderItem[];
        payment: Payment;
        date: number;
    }

    export interface OrderItem {
        product: product.Product;
        quantity: number;
    }
}
