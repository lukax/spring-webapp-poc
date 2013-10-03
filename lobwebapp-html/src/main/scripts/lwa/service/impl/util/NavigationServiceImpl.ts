///<reference path="./../../../reference.d.ts"/>

import svcu = d.service.contract.util;

export module service.impl.util {
    export class NavigationSvcImpl implements d.service.contract.util.NavigationService {
        //private $routeParams: ng.IRouteParamsService;
        private $stateParams: ng.ui.IStateParams;

        static $inject = ['$location', '$stateParams'];
        constructor(public $location: ng.ILocationService, $stateParams: ng.ui.IStateParams) {
            this.$stateParams = $stateParams;
        }

        get urlParams(){
            return this.$stateParams;
        }

        navigate(viewId: string, arg?: string) {
            switch (viewId) {
                case 'product_list': this.$location.url('/product/list');
                case 'product_new': this.$location.url('/product/new');
                case 'product_view': this.$location.url('/product/' + arg);


                case 'user_auth': this.$location.url('/user/auth');
                case 'user_status': this.$location.url('/user/status');


                default: return this.$location.url();
            }
        }
        
        
    }
}