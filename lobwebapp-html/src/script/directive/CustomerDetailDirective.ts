///<reference path="./../reference.d.ts"/>

export module directive {
    export class CustomerDetailDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            ref: '=',
        };
        public template =
            '<div ng-if="ref.id != 0">'
            +       '{{ref.firstName}} {{ref.lastName}}'
        +   '</div>'
        ;

    }
}