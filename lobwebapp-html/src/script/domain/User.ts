///<reference path='./base/AbstractEntity.ts'/>
///<reference path='./base/Person.ts'/>

module domain {
    export interface User extends domain.base.Person {
        username: string; 
        password: string; 
        roles?: string[];
    }
}