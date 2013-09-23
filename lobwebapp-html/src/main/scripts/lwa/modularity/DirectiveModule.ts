///<reference path='./../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./../../../../../ts-definitions/angularui/angular-ui.d.ts'/>

declare module "angularUiBootstrap" { }
declare module "angularAnimate" { }

import angular = require('angular');
import angularAnimate = require('angularAnimate');
import angularUi = require('angularUi');
import angularUiBootstrap = require('angularUiBootstrap');
import service_contract_au = require('./../service/contract/AuthService');
import domain_usr = require('./../domain/User');

export class DirectiveModule{
    private directiveNgModule: ng.IModule;
        
    constructor() {
        angularAnimate;
        angularUi;
        angularUiBootstrap;
        this.directiveNgModule = angular.module('lwaDirectiveModule', ['ui.directives', 'ui.bootstrap']);
    }
        
    configure(){
        this.directiveNgModule
            .directive('lwaProgress', this.progress)
            .directive('lwaStForm', this.stForm)
            .directive('lwaHref', ['$location', '$route', this.lwaHref])
            .directive('lwaCaret', this.lwaCaret)
            .directive('lwaAlerts', this.lwaAlerts)
            .directive('userAuthInfo', this.userAuthInfo)
            ;                           
        return this;
    }

    private progress = () => {
        return { 
            replace:true,
            transclude:true,
            restrict:"E", //element
            template:
                '<div class="progress progress-striped active">'+
                    '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">'+
                    '</div>'+
                '</div>'
        }
    };
    private stForm = () => {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope:{
                formn: '@formn',
                inputn: '@inputn'
                },
            template: '<div class="form-group" data-ng-class="{\'has-error\': formn.inputn.$invalid}" ng-transclude>'+
                        '</div>'
        }
    };
    private lwaHref = ($location: any, $route: any) => {
        return (scope: any, element: ng.IRootElementService, attrs: any) => {
            scope.$watch('lwaHref', () => {
                if(attrs.lwaHref) {
                    element.attr('href', attrs.lwaHref);
                    element.bind('click', (event: any) => {
                        scope.$apply(() => { if($location.url() == attrs.lwaHref) 
                            $route.reload(); });
                    });
                }
            });
        }
    };
    private lwaCaret = () => {
            return (scope: any, element: ng.IRootElementService, attrs: any) => {
                var initVal = attrs.lwaCaret;
                if(initVal == 'init') element.append(' <div class="caret"></div>');
                element.on('click', () => {
                    element.find('div.caret').toggleClass('caret up-caret');         
                });
        }
    };
    private lwaAlerts = () => {
        var defObj = { 
            restrict: 'E',
            replace: true,
            scope: true,
            controller: AlertController,
            template: '<alert ng-repeat="alert in alerts" type="alert.type" close="alerts.splice($index, 1)">'+
                          '<strong>{{alert.title}}</strong> {{alert.content}} <div class="pull-right">{{alert.time}}</div>'+
                      '</alert>'
        }

        return defObj;
    }
    private auth = () => {
        var defObj = {
            restrict: 'E',
            //replace: true,
            scope: true,
            //controller: 'Auth',
            //template: '<div class="auth"></div>',
            linkFn: (scope: any, element: ng.IRootElementService, attrs: any)=>{
                if(!scope.isAuth) element.remove();
            }
        }

        return defObj;
    }
    private userAuthInfo = () => {
        var defObj = {
            restrict: 'E',
            replace: true,
            scope: true,
            template: '<div class="authInfo">'+
                        ''+
                        'Olá <strong>{{user.username}}</strong> '+
                        '<button type="button" ng-hide="!user.isLogged" ng-click="logout()">Sair</button>'+
                      '</div>',
            controller: 'AuthUserCtrl'//,
//            linkFn: (scope: any, element: ng.IRootElementService, attrs: any) => {
////                if(scope.username === ''){
////                    element.find('.strong').remove();
////                }
////                else{
////                    element.append('<strong>Olá {{username}}</strong>');
////                }
//            }
        }
        return defObj;
    }
}

//TODO: Move this to somewhere else
//export class AuthController {
//    private authService: service_contract_au.AuthService;
//    private locationService: ng.ILocationService;
//    private scope: any;

//    static $inject = ['$scope', 'AuthService', '$location'];
//    constructor($scope: any, AuthService: service_contract_au.AuthService, $location: ng.ILocationService) {
//        this.scope = $scope;
//        this.locationService = $location;
//        this.authService = AuthService;

//        this.scope.user =  this.authService.currentUser();
//        this.scope.logout = () => { this.authService.logout(this.scope.user, () => { this.locationService.url('/user/auth'); }, () => { alert('Erro ao sair'); }); };
//    }
//}

export class AlertController {
    static $inject = ['$scope', 'AlertService'];
    constructor($scope, AlertService: any){
        $scope.alerts = AlertService.list();
    }
}