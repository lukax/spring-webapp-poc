///<reference path="../../../reference.d.ts"/>
import EntityServiceMock = require("./EntityServiceMock");

class PersonServiceMock<T extends domain.base.Person> extends EntityServiceMock<T> implements service.contract.base.PersonService<T> {

    constructor($timeout: ng.ITimeoutService) {
        super($timeout);
    }
}
export = PersonServiceMock;