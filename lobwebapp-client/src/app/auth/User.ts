///<reference path="../reference.ts"/>

module auth {
    export interface User extends core.Person {
        username: string;
        password: string;
        roles: string[];
    }
}
