///<reference path="reference.d.ts"/>

var ApplyCSS = ($: JQueryStatic, css: any) => {
    var el = $("<style></style>").append(css);
    $("head").append(el);
}

require.config({
    waitSeconds: 10,
    paths: {
        text: "../lib/requirejs-text/text",
        jquery: "../lib/jquery/jquery",
        jqueryMaskedInput: "../lib/jquery.maskedinput/jquery.maskedinput",
        bootstrap: "../lib/bootstrap/dist/js/bootstrap",
		angular: "../lib/angular/angular",
        angularRoute: "../lib/angular-route/angular-route",
        angularAnimate: "../lib/angular-animate/angular-animate",
        angularUi: "../lib/angular-ui/build/angular-ui",
        angularUiUtils: "../lib/angular-ui-utils/ui-utils",
        angularUiRouter: "../lib/angular-ui-router/release/angular-ui-router",
        angularUiBootstrap: "../lib/angular-ui-bootstrap-bower/ui-bootstrap",
        underscore: "../lib/underscore-amd/underscore",
        ngAnimateAnimateCss: "../lib/ngAnimate-animate.css/animate",
        nprogress: "../lib/nprogress/nprogress",
        dc: "../lib/dcjs/dc",
        d3: "../lib/d3/d3",
        crossfilter: "../lib/crossfilter/crossfilter",
        NProgress: "../lib/nprogress/nprogress"
    },
    map:{
        '*':{
            "fileupload": "../lib/jquery-file-upload/js/jquery.fileupload",
            "jquery.ui.widget": "../lib/jquery-file-upload/js/vendor/jquery.ui.widget",
            "jquery.iframe.transport": "lib/jquery-file-upload/js/jquery.iframe-transport.js"
        }
    },
	baseUrl: "script",
    shim: {
        "angular": {
            deps: ["jquery", "bootstrap", "underscore"],
            exports: "angular"
        },
        "jqueryMaskedInput": ["jquery"],
        "bootstrap": ["jquery"],
        "angularRoute": ["angular"],
        "angularAnimate": ["angular"],
        "angularUi": ["angular"],
        "angularUiUtils": ["jqueryMaskedInput","angular"],
        "angularUiRouter": ["angular"],
        "angularUiBootstrap": ["angular"],
        "ngAnimateAnimateCss": ["angularAnimate"],
        "NProgress": {
            deps: ["jquery"],
            exports: "NProgress"
        },
        "d3": { exports: "d3" },
        "crossfilter": { exports: "crossfilter" },
        "dc": {
            deps: ["jquery","text!../lib/dcjs/dc.css","d3","crossfilter"],
            exports: "dc",
            init: ApplyCSS
        }
    }
});

//require.onError = (err: RequireError) => {
//        window.location.replace("500.html?message=" + err.requireType + " | " + err.requireModules + " | " + err.originalError);
//};

require(["util/Progress"], (progress: any)=> {
   progress.util.Progress.start();
});

require(["angular", "util/Progress", "modularity/AppModule"], (angular: ng.IAngularStatic, progress: any, app: any) => {
    new app.modularity.AppModule().bootstrap(document);
    progress.util.Progress.done();
});

