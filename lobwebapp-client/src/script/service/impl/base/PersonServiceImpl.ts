///<reference path="../../../reference.d.ts"/>
import EntityServiceImpl = require("./EntityServiceImpl");

class PersonServiceImpl<T extends domain.base.Person> extends EntityServiceImpl<T> implements service.contract.base.PersonService<T> {

}
export = PersonServiceImpl;