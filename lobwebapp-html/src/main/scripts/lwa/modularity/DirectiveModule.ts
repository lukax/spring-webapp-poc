///<reference path='../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='../../../../../ts-definitions/angularui/angular-ui.d.ts'/>

//require([
//    'jquery',
//    'angular',
//    'angularUi',
//    'angularUiBootstrap',
//    'angularStrap'
//]);
declare module "angularUiBootstrap" { }
declare module "angularAnimate" { }

import angular = require('angular');
import angularAnimate = require('angularAnimate');
import angularUi = require('angularUi');
import angularUiBootstrap = require('angularUiBootstrap');

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
            .directive('lwaAlerts', ['_alertService', this.lwaAlerts])
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
                inputn: '@inputn',
                },
            template: '<div class="form-group" ng-class="{\'has-error\': formn.inputn.$invalid}" ng-transclude>'+
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
    private lwaAlerts = (_alertService: any) => {
        var defObj = { 
                restrict: 'E',
                replace: true,
                template: '<alert ng-repeat="alert in alerts" type="alert.type" close="alerts.splice($index, 1)">'+
                              '<strong>{{alert.title}}</strong> {{alert.content}} <div class="pull-right">{{alert.time}}</div>'+
                          '</alert>'
        }

        return defObj;
    }
}