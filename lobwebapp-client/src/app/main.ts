///<reference path="reference.d.ts"/>

require.config({
    paths: {
        text: "../lib/requirejs-text/text",
        jquery: "../lib/jquery/dist/jquery",
        jqueryMaskedInput: "../lib/jquery.maskedinput/jquery.maskedinput",
        bootstrap: "../lib/bootstrap/dist/js/bootstrap",
        angular: "../lib/angular/angular",
        angularRoute: "../lib/angular-route/angular-route",
        angularAnimate: "../lib/angular-animate/angular-animate",
        angularUi: "../lib/angular-ui/build/angular-ui",
        angularUiUtils: "../lib/angular-ui-utils/ui-utils",
        angularUiBootstrap: "../lib/angular-ui-bootstrap-bower/ui-bootstrap",
        underscore: "../lib/underscore-amd/underscore",
        dc: "../lib/dcjs/dc",
        d3: "../lib/d3/d3",
        crossfilter: "../lib/crossfilter/crossfilter",
        NProgress: "../lib/nprogress/nprogress"
    },
    map:{
        "*": {
            "urijs": "../lib/uri.js/src/URI",
            "fileupload": "../lib/jquery-file-upload/js/jquery.fileupload",
            "jquery.ui.widget": "../lib/jquery-file-upload/js/vendor/jquery.ui.widget",
            "jquery.iframe.transport": "lib/jquery-file-upload/js/jquery.iframe-transport.js"
        }
    },
    shim: {
        "angular": {
            deps: ["jquery", "bootstrap", "underscore"],
            exports: "angular"
        },
        "jqueryMaskedInput": {
            deps: ["jquery"],
            exports: "$.fn.mask"
        },
        "bootstrap": {
            deps: ["jquery"],
            exports: "$.fn.alert"
        },
        "angularRoute": ["angular"],
        "angularAnimate": ["angular"],
        "angularUi": ["angular"],
        "angularUiUtils": ["jqueryMaskedInput","angular"],
        "angularUiBootstrap": ["angular"],
        "NProgress": {
            deps: ["jquery"],
            exports: "NProgress"
        },
        "d3": { exports: "d3" },
        "crossfilter": { exports: "crossfilter" },
        "dc": {
            deps: ["jquery","text!../lib/dcjs/dc.css","d3","crossfilter"],
            exports: "dc",
            init: ($: JQueryStatic, css: any) => {
                var el = $("<style></style>").append(css);
                $("head").append(el);
            }
        }
    }
});

require(
  [
    "angular", "angularRoute", "angularAnimate", "angularUi", "angularUiUtils", "angularUiBootstrap",
    "lwa.core/module",
    "lwa.customer/module",
    "lwa.order/module",
    "lwa.product/module",
    "lwa.stock/module",
    "lwa.user/module"
  ],
  (angular: ng.IAngularStatic) => {
    angular.module("lwa",
      [
        "lwa.core",
        "lwa.customer",
        "lwa.order",
        "lwa.product",
        "lwa.stock",
        "lwa.user"
      ]);
    (<any>angular.element(document)).ready(() => {
        angular.bootstrap(document, ["lwa"]);
    });
});
