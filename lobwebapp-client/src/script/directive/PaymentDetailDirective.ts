///<reference path="../reference.d.ts"/>
import enums = require("./../util/EnumUtil");

export function PaymentDetailDirective(): ng.IDirective {
    return {
        restrict: 'E',
        scope: {
            payment: '='
        },
        templateUrl: "template/directive/PaymentDetailTemplate.html",
        link: (scope: any, element: any, attrs: ng.IAttributes) => {
            scope.$watch("payment.status", () => {
                if (scope.payment != null) {
                    var labelClass: string = "";
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
    };

}

export function PaymentStatusFilter() {
    return function(input: enums.PaymentMode) {
        var localizedInput: string = "";
        switch (input) {
            case enums.PaymentStatus.CANCELLED:
                localizedInput = "Cancelado";
                break;
            case enums.PaymentStatus.OK:
                localizedInput = "OK"
                break;
            case enums.PaymentStatus.PENDING:
                localizedInput = "Pendente"
                break;
            default:
                localizedInput = "Erro!"
                break;
        }
        return localizedInput;
    }
}

export function PaymentModeFilter() {
    return function(input: enums.PaymentMode) {
        var localizedInput: string = "";
        switch (input) {
            case enums.PaymentMode.CHECK:
                localizedInput = "Cheque";
                break;
            case enums.PaymentMode.CREDIT_CARD:
                localizedInput = "Cartão de crédito"
                break;
            case enums.PaymentMode.MONEY:
                localizedInput = "Dinheiro"
                break;
            default:
                localizedInput = "Erro!"
                break;
        }
        return localizedInput;
    }
}