///<reference path="../reference.ts"/>

order.module

  .filter("paymentMode", (input:order.PaymentMode) => {
    var localizedInput:string = "";
    switch (input) {
      case order.PaymentMode.CHECK:
        localizedInput = "Cheque";
        break;
      case order.PaymentMode.CREDIT_CARD:
        localizedInput = "Cartão de crédito";
        break;
      case order.PaymentMode.MONEY:
        localizedInput = "Dinheiro";
        break;
      default:
        localizedInput = "Erro!";
        break;
    }
    return localizedInput;
  })

  .filter("paymentStatus", (input:order.PaymentStatus) => {
    var localizedInput:string = "";
    switch (input) {
      case order.PaymentStatus.CANCELLED:
        localizedInput = "Cancelado";
        break;
      case order.PaymentStatus.OK:
        localizedInput = "OK";
        break;
      case order.PaymentStatus.PENDING:
        localizedInput = "Pendente";
        break;
      default:
        localizedInput = "Erro!";
        break;
    }
    return localizedInput;
  })

  .directive("paymentDetail", () => {
    return {
      restrict: 'E',
      scope: {
        payment: '='
      },
      templateUrl: "template/directive/PaymentDetailTemplate.html",
      link: (scope:any, element:any, attrs:ng.IAttributes) => {
        scope.$watch("payment.status", () => {
          if (scope.payment != null) {
            var labelClass:string = "";
            switch (scope.payment.status) {
              case "OK":
                labelClass = "label-default";
                break;
              case "PENDING":
                labelClass = "label-warning";
                break;
              case "CANCELLED":
                labelClass = "label-danger";
                break;
            }
            scope.labelClass = labelClass;
          }
        });
      }
    }
  })

