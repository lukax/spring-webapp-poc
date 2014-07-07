///<reference path="../../../reference.d.ts"/>

module service.mock.base {
    export class PersonServiceMock<T extends domain.base.Person> extends EntityServiceMock<T> implements service.contract.base.PersonService<T> {

        constructor($timeout: ng.ITimeoutService) {
            super($timeout);
        }
    }
}