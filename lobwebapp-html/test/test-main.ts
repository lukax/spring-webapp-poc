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
        jquery: "lib/jquery/dist/jquery.min",
        angular: "lib/angular/angular.min",
        angularUiRouter: "lib/angular-ui-router/release/angular-ui-router.min",
        angularMocks: "lib/angular-mocks/angular-mocks",
        underscore: "lib/underscore/underscore-min"
    },
    map: {
        "*": {
            "urijs": "lib/uri.js/src/URI",
        }
    },
    shim: {
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angularUiRouter": ["angular"],
        "angularMocks": ["angular"],
        "underscore": {
            exports: "_"
        }
    },
    deps: tests,
    callback: (<any>window).__karma__.start
});