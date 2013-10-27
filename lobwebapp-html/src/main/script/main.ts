///<reference path="reference.d.ts"/>

require.config({
    paths: {
        text: "./../lib/requirejs-text/text",
        jquery: "./../lib/jquery/jquery",
        bootstrap: "./../lib/bootstrap-sass/dist/js/bootstrap",
		angular: "./../lib/angular/angular",
        angularRoute: "./../lib/angular-route/angular-route",
        //angularMocks: "./../lib/angular-mocks/angular-mocks",
        angularAnimate: "./../lib/angular-animate/angular-animate",
        angularUi: "./../lib/angular-ui/build/angular-ui",
        angularUiRouter: "./../lib/angular-ui-router/release/angular-ui-router",
        angularUiBootstrap: "./../lib/angular-ui-bootstrap/ui-bootstrap",
        //backbone: "./../lib/backbone-amd/backbone",
        ngEkathuwa: "./../lib/ngEkathuwa/ekathuwa",
        ngAnimateAnimateCss: "./../lib/ngAnimate-animate.css/animate",
        nprogress: "./../lib/nprogress/nprogress",
        dcjs: "./../lib/dcjs/dc",
        d3js: "./../lib/d3/d3",
        crossfilter: "./../lib/crossfilter/crossfilter",
        nprogress: "./../lib/nprogress/nprogress",
        linqjs: "./../lib/linqjs-amd/linq"
    },
	baseUrl: "script",
    shim: {
        "bootstrap": {
            deps: [ "jquery" ],
            "exports": "bootstrap"
        },
        "angular": {
            deps: ["jquery"],
            "exports": "angular"
        },
        "angularRoute": {
            deps: ["angular"],
            "exports": "angularRoute"
        },
        "angularMocks": {
            deps: ["angular"],
            "exports": "angular.mock"
        },
        "angularAnimate": {
            deps: ["angular"],
            "exports": "angularAnimate"
        },
        "angularUi": {
            deps: ["angular", "jquery"],
            "exports": "angularUi"
        },
        "angularUiRouter": {
            deps: ["angular"],
            "exports": "angularUiRouter"
        },
        "angularUiBootstrap": {
            deps: ["angular", "jquery"],
            "exports": "angularUiBootstrap"
        },
        "ngAnimateAnimateCss": {
            deps: ["angularAnimate"],
            "exports": "ngAnimateAnimateCss"
        },
        "nprogress": {
            deps: ["jquery"],
            "exports": "nprogress"
        },
        "d3js": { "exports": "dcjs" },
        "crossfilter": { "exports": "crossfilter" },
        "dcjs": {   //Loading CSS On Demand
            deps: ["jquery","text!./../lib/dcjs/dc.css","d3js","crossfilter"],
            "exports": "dcjs",
            init: ($, css) => {
                var el = $("<style></style>").append(css);
                $("head").append(el);
            }
        }
    },
	priority: [
        "angular"
	]
});

require(["util/Progress"], (progress: any)=> {
   progress.util.Progress.start();
});

require(["modularity/AppModule", "util/Progress"], (app: any, progress: any) => {
    new app.modularity.AppModule().bootstrap(document);
    progress.util.Progress.done();
});