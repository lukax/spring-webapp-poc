///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
//import svc = require('../../main/script/modularity/ServiceModule');
declare module "service/impl/util/AlertServiceImpl" { }
import alertsvc = require('service/impl/util/AlertServiceImpl');

describe('AlertService', function () {
    //new svc.modularity.ServiceModule().configure();
    //beforeEach(module('lwa.service'));

    //it('should properly provide a welcome message', inject((AlertService: d.service.contract.util.AlertService) => {
    //    expect(AlertService.list().length).toBe(0);
    //    console.log('teste');
    //}));

    it('should pass', () => {
        expect(true).toBeTruthy();
        console.log("YAY");
    });

});
