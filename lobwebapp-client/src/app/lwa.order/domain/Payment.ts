///<reference path="../../reference.d.ts"/>

module domain {
    export interface Payment extends domain.base.AbstractEntity {
        quantity: number;
        status: string;
        mode: string;
    }
}