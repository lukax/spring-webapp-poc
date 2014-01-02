///<reference path="./../reference.d.ts"/>

export module directive {
    export class PaymentDetailDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            ref: '=',
        };
        public template =
            '<div ng-if="paymentStatus">'
            + ' <span class="label {{labelClass}}">'
            +   '{{paymentStatus}}'
            + '</span>'
            +  ' <span class="label label-default">'
            +   '{{paymentMode}}'
            + '</span>'
        +   '</div>'
        ;
        public link = (scope: any, element: any, attrs: ng.IAttributes) => {
            scope.$watch("ref.status", (newValue, oldValue) => {
                var paymentStatus;
                var labelClass;
                switch (newValue) {
                    case "PENDING":
                        paymentStatus = "Pagamento pendente";
                        labelClass = "label-default";
                        break;
                    case "OK":
                        paymentStatus = "Pagamento confirmado";
                        labelClass = "label-success";
                        break;
                    case "CANCELLED":
                        paymentStatus = "Pagamento cancelado";
                        labelClass = "label-warning";
                        break;
                    default:
                        paymentStatus = null;
                        break;
                }
                scope.paymentStatus = paymentStatus;
                scope.labelClass = labelClass;
            });

            scope.$watch("ref.mode", (newValue, oldValue) => {
                var paymentMode;
                switch (newValue) {
                    case "MONEY":
                        paymentMode = "Dinheiro";
                        break;
                    case "CREDIT_CARD":
                        paymentMode = "Cartão";
                        break;
                    case "CHECK":
                        paymentMode = "Cheque";
                        break;
                }
                scope.paymentMode = paymentMode;
            });
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("paymentDetail", [() => new directive.PaymentDetailDirective()]);
};