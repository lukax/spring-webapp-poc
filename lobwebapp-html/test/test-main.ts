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
        angular: "lib/angular/angular",
        angularRoute: "lib/angular-route/angular-route",
        angularMocks: "lib/angular-mocks/angular-mocks",
        linqjs: "lib/linqjs-amd/linq",
        nprogress: "lib/nprogress/nprogress",
        underscore: "lib/underscore-amd/underscore"
    },
    shim: {
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
        }
    },
    deps: tests,
    callback: (<any>window).__karma__.start
});