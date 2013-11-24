///<reference path="./../reference.d.ts"/>

export module directive {
    export class ClientDetailDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            client: '=ref',
        };
        public template =
            '<div ng-if="client.id != 0">'
        +       '{{client.firstName}} {{client.lastName}}'
        +   '</div>'
        ;

    }
}