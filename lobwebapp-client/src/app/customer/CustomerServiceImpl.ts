///<reference path="../reference.ts"/>

module customer {
  export class CustomerServiceImpl extends core.EntityServiceImpl<Customer> implements CustomerService {
    static $inject = ["$http"];
    constructor($http:ng.IHttpService) {
      super($http, "customer");
    }

    default():Customer {
      return { id: 0, name: "" };
    }
  }
}

customer.module.service("CustomerService", customer.CustomerServiceImpl);
