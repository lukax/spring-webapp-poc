///<reference path="../reference.ts"/>

module customer {
  export class CustomerServiceMock extends core.EntityServiceMock<Customer> implements CustomerService {
    static $inject = ["$timeout"];
    constructor(public $timeout:ng.ITimeoutService) {
      super($timeout);

      this.addToRepository({ id: 0, name: "" });
      this.addToRepository({ id: 1, name: "John Doe" });
      this.addToRepository({ id: 2, name: "Jane Doe" });
      this.addToRepository({ id: 3, name: "Jonnie Doe" });
    }

    default():Customer {
      return { id: 0, name: "" };
    }
  }
}

//customer.module.controller("CustomerService", customer.CustomerServiceMock);
