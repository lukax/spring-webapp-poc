///<reference path="./../reference.d.ts"/>

export module directive {
    export class SaveChangesDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            saveDisabled: '=',
            removeDisabled: '=',
            remove: '&'
        };
        public templateUrl = '/template/directive/SaveChangesTemplate.html';

    }
}