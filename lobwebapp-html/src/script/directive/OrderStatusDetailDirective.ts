///<reference path="./../reference.d.ts"/>

export module directive {
    export class OrderStatusDetailDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            ref: '=',
        };
        public template =
            '<div >'
            + ' <span class="label" ng-class="{\'label-default\': ref.payment==0, \'label-success\': ref.payment==1, \'label-warning\': ref.payment==2}" ng-if="ref.payment != -1"> '
            +   ' <ng-pluralize count="ref.payment" '
            +                        " when=\"{'0': 'Pagamento pendente', "
            +                        " '1': 'Pagamento confirmado', " 
            +                        " '2': 'Pagamento cancelado'}\"> "
            +     '</ng-pluralize>'
            + '</span>'
            + ' <span class="label" ng-class="{\'label-default\': ref.delivery==0, \'label-success\': ref.delivery==1, \'label-warning\': ref.delivery==2}" ng-if="ref.delivery != -1"> '
            +     ' <ng-pluralize count="ref.delivery" '
            +                           " when=\"{'0': 'Entrega pendente', "
            +                           " '1': 'Entrega confirmada', "
            +                           " '2': 'Entrega cancelada'}\"> "
            +       '</ng-pluralize>'
            + '</span>'
        +   '</div>'
        ;

    }
}