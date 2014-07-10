///<reference path="../../reference.ts"/>

module directive {
    export class PaymentDetailDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            payment: '='
        };
        templateUrl = "template/directive/PaymentDetailTemplate.html";
        link = (scope: any, element: any, attrs: ng.IAttributes) => {
            scope.$watch("payment.status", () => {
                if(scope.payment != null){
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
    }
}

module filter {    
    export class PaymentStatusFilter {
        constructor(input: util.PaymentMode) {
            var localizedInput: string = "";
            switch(input){
                case util.PaymentStatus.CANCELLED:
                    localizedInput = "Cancelado";
                    break;
                case util.PaymentStatus.OK:
                    localizedInput = "OK"
                    break;
                case util.PaymentStatus.PENDING:
                    localizedInput = "Pendente"
                    break;
                default:
                    localizedInput = "Erro!"
                    break;
            }
            return localizedInput;
        }

    }
    export class PaymentModeFilter {
        constructor(input: util.PaymentMode) {
            var localizedInput: string = "";
            switch(input){
                case util.PaymentMode.CHECK:
                    localizedInput = "Cheque";
                    break;
                case util.PaymentMode.CREDIT_CARD:
                    localizedInput = "Cartão de crédito"
                    break;
                case util.PaymentMode.MONEY:
                    localizedInput = "Dinheiro"
                    break;
                default:
                    localizedInput = "Erro!"
                    break;
            }
            return localizedInput;
        }
    }
}
