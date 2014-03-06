///<reference path="reference.d.ts"/>

var ApplyCSS = ($: JQueryStatic, css: any) => {
    var el = $("<style></style>").append(css);
    $("head").append(el);
}

require.config({
    waitSeconds: 10,
    paths: {
        text: "../lib/requirejs-text/text",
        jquery: "../lib/jquery/dist/jquery.min",
        jqueryMaskedInput: "../lib/jquery.maskedinput/jquery.maskedinput.min",
        bootstrap: "../lib/bootstrap/dist/js/bootstrap.min",
        angular: "../lib/angular/angular.min",
        angularAnimate: "../lib/angular-animate/angular-animate.min",
        angularUi: "../lib/angular-ui/build/angular-ui.min",
        angularUiUtils: "../lib/angular-ui-utils/ui-utils",
        angularUiRouter: "../lib/angular-ui-router/release/angular-ui-router.min",
        angularUiBootstrap: "../lib/angular-ui-bootstrap-bower/ui-bootstrap.min",
        underscore: "../lib/underscore/underscore-min",
        dc: "../lib/dcjs/dc.min",
        d3: "../lib/d3/d3.min",
        crossfilter: "../lib/crossfilter/crossfilter.min",
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
        "jqueryMaskedInput": {
            deps: ["jquery"],
            exports: "$.fn.mask"
        },
        "bootstrap": {
            deps: ["jquery"],
            exports: "$.fn.alert"
        },
        "angularAnimate": ["angular"],
        "angularUi": ["angular"],
        "angularUiUtils": ["jqueryMaskedInput","angular"],
        "angularUiRouter": ["angular"],
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
            init: ApplyCSS
        }
    }
});

require.onError = (err: RequireError) => {
    window.location.replace("500.html?message=" + encodeURIComponent(err.message) +
        "&details=" + encodeURIComponent(err.requireType + ", " + err.requireModules));
};

require(["util/Progress"], (progress: any)=> {
    new progress.util.Progress().start();
});

require(["util/Progress", "modularity/AppModule"], (progress: any, app: any) => {
    new app.modularity.AppModule().bootstrap(document);
    new progress.util.Progress().done();
});

