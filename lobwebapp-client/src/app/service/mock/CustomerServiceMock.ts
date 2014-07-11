///<reference path="../../reference.ts"/>

module service.mock {
  export class CustomerServiceMock extends base.PersonServiceMock<domain.Customer> implements service.contract.CustomerService {

    static $inject = ["$timeout"];
    constructor(public $timeout:ng.ITimeoutService) {
      super($timeout);

      this.addToRepository({ id: 0, name: "" });
      this.addToRepository({ id: 1, name: "John Doe" });
      this.addToRepository({ id: 2, name: "Jane Doe" });
      this.addToRepository({ id: 3, name: "Jonnie Doe" });
    }

  }
}
