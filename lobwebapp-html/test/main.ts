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
    baseUrl: "/base/src/main/",
    paths: {
        jquery: "./../main/lib/jquery/jquery",
        angular: "./../main/lib/angular/angular",
        angularRoute: "./../main/lib/angular-route/angular-route",
        angularMocks: "./../main/lib/angular-mocks/angular-mocks"
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