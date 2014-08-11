///<reference path="../reference.ts"/>

customer.module
  .directive("customerDetail", ():ng.IDirective => {
    return {
      restrict: 'E',
      scope: {
        customer: "="
      },
      template: "{{customer.name}}"
    }
  })

