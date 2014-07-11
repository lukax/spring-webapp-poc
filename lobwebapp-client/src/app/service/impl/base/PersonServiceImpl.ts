///<reference path="../../../reference.ts"/>

module service.impl.base {
  export class PersonServiceImpl<T extends domain.base.Person> extends EntityServiceImpl<T> implements service.contract.base.PersonService<T> {

    constructor(contextUrl:string, public $http:ng.IHttpService, public hasDefault?:service.contract.base.HasDefaultValue<T>) {
      super(contextUrl, $http, hasDefault);
    }
  }
}
