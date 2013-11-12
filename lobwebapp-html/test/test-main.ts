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
        linqjs: "lib/linqjs-amd/linq",
        NProgress: "lib/nprogress/nprogress",
        underscore: "lib/underscore-amd/underscore"
    },
    priority: [
        "angular",
        "angularMocks"
    ],
    shim: {
        "bootstrap": {
            deps: ["jquery"],
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
        "angularUiRouter": {
            deps: ["angular"],
            "exports": "angularUiRouter"
        },
        "angularMocks": {
            deps: ["angular"],
            "exports": "angularMocks"
        },
        "NProgress": {
            deps: ["jquery"],
            "exports": "NProgress"
        }
    },
    deps: tests,
    callback: (<any>window).__karma__.start
});