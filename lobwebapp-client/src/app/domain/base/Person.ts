///<reference path="../../reference.ts"/>

module domain.base {
    export interface Person extends domain.base.AbstractEntity {
        name: string;
    }
}