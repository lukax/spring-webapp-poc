///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface Client extends domain.base.AbstractEntity {
        name: string; 
        lastName: string;
    }
}