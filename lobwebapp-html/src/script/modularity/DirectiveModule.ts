///<reference path="../reference.d.ts"/>

///<amd-dependency path="angularRoute"/>
///<amd-dependency path="angularAnimate"/>
///<amd-dependency path="angularUi"/>
///<amd-dependency path="angularUiBootstrap"/>
///<amd-dependency path="ngAnimateAnimateCss"/>
///<amd-dependency path="angularUiUtils"/>

import i1 = require('./../directive/ProductDetailDirective');
import i2 = require('./../directive/CustomerDetailDirective');
import i3 = require('./../directive/PaymentDetailDirective');
import i4 = require('./../directive/SaveChangesDirective');
import i5 = require('./../directive/QuickSearchDirective');

export module modularity {
    export class DirectiveModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module('lwa.directive', ['ngRoute','ngAnimate', 'ui.bootstrap', 'ui.utils']);
        }

        configure() {
            //Global usage directives configuration
            this.module
                .directive('lwaProgress', this.progress)
                .directive('lwaHref', ['$location', '$route', this.lwaHref])
                .directive('lwaCaret', this.lwaCaret)
                .directive('productDetail', [() => new i1.directive.ProductDetailDirective()])
                .directive('customerDetail', [() => new i2.directive.CustomerDetailDirective()])
                .directive('paymentDetail', [() => new i3.directive.PaymentDetailDirective()])
                .directive('saveChanges', [() => new i4.directive.SaveChangesDirective()])
                .directive('quickSearch', [() => new i5.directive.QuickSearchDirective()])
            ;
            return this;
        }

        private progress = () => {
            return {
                replace: true,
                transclude: true,
                restrict: "E", //element
                template:
                '<div class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
                    '</div>' +
                '</div>'
            }
        };
        private lwaHref = ($location: any, $route: any) => {
            return (scope: any, element: ng.IRootElementService, attrs: any) => {
                scope.$watch('lwaHref', () => {
                    if (attrs.lwaHref) {
                        element.attr('href', attrs.lwaHref);
                        element.bind('click', (event: any) => {
                            scope.$apply(() => {
                                if ('#' + $location.url() === attrs.lwaHref)
                                    $route.reload();
                            });
                        });
                    }
                });
            }
        };
        private lwaCaret = () => {
            return (scope: any, element: ng.IRootElementService, attrs: any) => {
                var initVal = attrs.lwaCaret;
                if (initVal == 'init') element.append(' <div class="caret"></div>');
                element.on('click', () => {
                    element.find('div.caret').toggleClass('caret up-caret');
                });
            }
        };

    }
}