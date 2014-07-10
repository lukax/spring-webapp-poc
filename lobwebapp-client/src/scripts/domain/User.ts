///<reference path="../reference.ts"/>

module domain {
    export interface User extends domain.base.Person {
        username: string; 
        password: string; 
        roles: string[];
    }
}