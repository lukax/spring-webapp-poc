///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
declare module "script/modularity/ServiceModule" { export = any }
import svc = require('script/modularity/ServiceModule');

describe('AlertService', function () {
    new svc.modularity.ServiceModule().configure();
    beforeEach(module('lwa.service'));

    it('should retrieve an alert', inject((AlertService: d.service.contract.util.AlertService) => {
        expect(AlertService.list()).toBeDefined();
        expect(AlertService.list().length).toBe(0);
    }));

    it('should add an alert', inject((AlertService:d.service.contract.util.AlertService) => {
        AlertService.add("a content", "a title");
        expect(AlertService.list()[0].content).toBe("a content");
        expect(AlertService.list().length).toBe(1);
    }));

    it('should remove an alert', inject((AlertService:d.service.contract.util.AlertService) => {
        var alert = AlertService.add("a content", "a title");
        AlertService.remove(alert);
        expect(AlertService.list().length).toBe(0);
    }));

    it('should remove all alerts', inject((AlertService:d.service.contract.util.AlertService) => {
        AlertService.add("content 1");
        AlertService.add("content 2");
        AlertService.removeAll();
        expect(AlertService.list().length).toBe(0);
    }));

    it('should remove old alerts', inject((AlertService:d.service.contract.util.AlertService, $timeout: ng.ITimeoutService) => {
        AlertService.add("content 1", null, null, new Date(2013,5,13, 0,0,0, 0));
        expect(AlertService.list().length).toBe(1);
        $timeout.flush();
        expect(AlertService.list().length).toBe(0);
    }));

});
