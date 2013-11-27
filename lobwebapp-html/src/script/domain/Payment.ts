/**
 * Created by lucas on 10/25/13.
 */
///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Payment extends domain.base.AbstractEntity {
        quantity: number;
        status: string;
        mode: string;
    }
}