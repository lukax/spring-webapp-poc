///<reference path='./base/AbstractEntity.ts'/>

module domain {
    export interface User extends domain.base.AbstractEntity {
        username: string; 
        password: string; 
        role: string;
        isLogged?: boolean;
    }
}