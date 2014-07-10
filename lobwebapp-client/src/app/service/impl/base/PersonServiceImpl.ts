///<reference path="../../../reference.ts"/>

module service.impl.base {
  export class PersonServiceImpl<T extends domain.base.Person> extends EntityServiceImpl<T> implements service.contract.base.PersonService<T> {

  }
}
