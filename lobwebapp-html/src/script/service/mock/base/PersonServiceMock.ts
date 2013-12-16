///<reference path="./../../../reference.d.ts"/>

import i0 = require("./EntityServiceMock");

export module service.mock.base {
    export class PersonServiceMock<T extends domain.base.Person> extends i0.service.mock.base.EntityServiceMock<T> implements d.service.contract.base.PersonService<T> {

        constructor($timeout: ng.ITimeoutService) {
            super($timeout);
        }
    }
}