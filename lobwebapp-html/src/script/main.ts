///<reference path="reference.d.ts"/>

var ApplyCSS = ($: JQueryStatic, css: any) => {
    var el = $("<style></style>").append(css);
    $("head").append(el);
}

require.config({
    waitSeconds: 10,
    paths: {
        text: "./../lib/requirejs-text/text",
        jquery: "./../lib/jquery/jquery",
        bootstrap: "./../lib/bootstrap/dist/js/bootstrap",
		angular: "./../lib/angular/angular",
        angularRoute: "./../lib/angular-route/angular-route",
        angularAnimate: "./../lib/angular-animate/angular-animate",
        angularUi: "./../lib/angular-ui/build/angular-ui",
        angularUiUtils: "./../lib/angular-ui-utils/ui-utils",
        angularUiRouter: "./../lib/angular-ui-router/release/angular-ui-router",
        angularUiBootstrap: "./../lib/angular-ui-bootstrap/ui-bootstrap-0.6.0",
        underscore: "./../lib/underscore-amd/underscore",
        ngAnimateAnimateCss: "./../lib/ngAnimate-animate.css/animate",
        nprogress: "./../lib/nprogress/nprogress",
        dcjs: "./../lib/dcjs/dc",
        d3js: "./../lib/d3/d3",
        crossfilter: "./../lib/crossfilter/crossfilter",
        NProgress: "./../lib/nprogress/nprogress"
    },
	baseUrl: "script",
    shim: {
        "bootstrap": ["jquery"],
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angularRoute": ["angular"],
        "angularAnimate": ["angular"],
        "angularUi": ["angular"],
        "angularUiUtils": ["angular"],
        "angularUiRouter": ["angular"],
        "angularUiBootstrap": ["angular"],
        "ngAnimateAnimateCss": ["angularAnimate"],
        "NProgress": {
            deps: ["jquery"],
            exports: "NProgress"
        },
        "d3js": { exports: "d3" },
        "crossfilter": { exports: "crossfilter" },
        "dcjs": {
            deps: ["jquery","text!./../lib/dcjs/dc.css","d3js","crossfilter"],
            exports: "dc",
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

