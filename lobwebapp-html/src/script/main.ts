///<reference path="reference.d.ts"/>

var ApplyCSS = ($: JQueryStatic, css: any) => {
    var el = $("<style></style>").append(css);
    $("head").append(el);
}

require.config({
    paths: {
        text: "./../lib/requirejs-text/text",
        jquery: "./../lib/jquery/jquery",
        bootstrap: "./../lib/bootstrap/dist/js/bootstrap",
		angular: "./../lib/angular/angular",
        angularRoute: "./../lib/angular-route/angular-route",
        //angularMocks: "./../lib/angular-mocks/angular-mocks",
        angularAnimate: "./../lib/angular-animate/angular-animate",
        angularUi: "./../lib/angular-ui/build/angular-ui",
        angularUiUtils: "./../lib/angular-ui-utils/ui-utils",
        angularUiRouter: "./../lib/angular-ui-router/release/angular-ui-router",
        angularUiBootstrap: "./../lib/angular-ui-bootstrap/ui-bootstrap-0.6.0",
        underscore: "./../lib/underscore-amd/underscore",
        //backbone: "./../lib/backbone-amd/backbone",
        ngAnimateAnimateCss: "./../lib/ngAnimate-animate.css/animate",
        nprogress: "./../lib/nprogress/nprogress",
        dcjs: "./../lib/dcjs/dc",
        d3js: "./../lib/d3/d3",
        crossfilter: "./../lib/crossfilter/crossfilter",
        NProgress: "./../lib/nprogress/nprogress"
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
            "exports": "angularMocks"
        },
        "angularAnimate": {
            deps: ["angular"],
            "exports": "angularAnimate"
        },
        "angularUi": {
            deps: ["angular", "jquery"],
            "exports": "angularUi"
        },
        "angularUiUtils": {
            deps: ["angular"],
            "exports": "angularUiUtils"
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
        "NProgress": {
            deps: ["jquery"],
            "exports": "NProgress"
        },
        "d3js": { "exports": "dcjs" },
        "crossfilter": { "exports": "crossfilter" },
        "dcjs": {   //Loading CSS On Demand
            deps: ["jquery","text!./../lib/dcjs/dc.css","d3js","crossfilter"],
            "exports": "dcjs",
            init: ApplyCSS
        }
    }
});

require.onError = (err: RequireError) => {
        window.location.replace("500.html?message=" + err.requireType + " | " + err.requireModules + " | " + err.originalError);
};

require(["util/Progress"], (progress: any)=> {
   progress.util.Progress.start();
});

require(["jquery", "angular", "util/Progress", "modularity/AppModule"], ($: JQueryStatic, angular: ng.IAngularStatic, progress: any, app: any) => {
    new app.modularity.AppModule().bootstrap(document);
    progress.util.Progress.done();
});

