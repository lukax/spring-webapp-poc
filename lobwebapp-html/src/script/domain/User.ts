///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface User extends domain.base.AbstractEntity {
        username: string; 
        password: string; 
        roles: string[];
        isLogged?: boolean;
    }
}