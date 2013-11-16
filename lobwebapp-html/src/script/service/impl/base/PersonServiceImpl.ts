///<reference path="./../../../reference.d.ts"/>
import i0 = require("./EntityServiceImpl");

export module service.impl.base {
    export class PersonServiceImpl<T extends domain.base.Person> extends i0.service.impl.base.EntityServiceImpl<T> implements d.service.contract.base.PersonService<T> {

        

    }
}