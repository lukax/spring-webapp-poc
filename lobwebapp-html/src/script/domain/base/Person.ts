///<reference path='./AbstractEntity.ts'/>

module domain.base {
    export interface Person extends domain.base.AbstractEntity {
        name: string;
    }
}