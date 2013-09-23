///<reference path='./base/AbstractEntity.ts'/>
///<reference path='./../../../../../ts-definitions/underscore/underscore.d.ts'/>

import domain_base = require('./base/AbstractEntity');

export class User extends domain_base.AbstractEntity {

    constructor(public id: number, public username: string, public password: string, public role: UserRole){
        super(id);
    }
}

export enum UserRole{
	admin,
    manager,
	employee,
    client
}