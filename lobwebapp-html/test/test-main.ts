///<reference path="reference.d.ts"/>

var tests = [];
for (var file in (<any>window).__karma__.files) {
    if ((<any>window).__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    baseUrl: "/base/src",
    paths: {
        jquery: "lib/jquery/jquery",
        bootstrap: "lib/bootstrap/dist/js/bootstrap",
        angular: "lib/angular/angular",
        angularRoute: "lib/angular-route/angular-route",
        angularUiRouter: "lib/angular-ui-router/release/angular-ui-router",
        angularMocks: "lib/angular-mocks/angular-mocks",
        NProgress: "lib/nprogress/nprogress",
        underscore: "lib/underscore-amd/underscore"
    },
    shim: {
        "bootstrap": ["jquery"],
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angularRoute":  ["angular"],
        "angularUiRouter": ["angular"],
        "angularMocks": ["angular"],
        "NProgress": {
            deps: ["jquery"],
            exports: "NProgress"
        }
    },
    deps: tests,
    callback: (<any>window).__karma__.start
});