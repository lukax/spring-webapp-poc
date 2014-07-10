///<reference path="../../reference.ts"/>

describe("service: AlertService", () => {
  beforeEach(() => {
    module(($provide:ng.auto.IProvideService) => {
      $provide.service("AlertService", service.impl.AlertServiceImpl);
    });
  });

  it("should retrieve an alert", inject((AlertService:service.contract.AlertService) => {
    expect(AlertService.list()).toBeDefined();
    expect(AlertService.list()).toEqual(jasmine.any(Array));
  }));

  it("should add an alert", inject((AlertService:service.contract.AlertService) => {
    AlertService.add({ content: "a content", title: "a title" });
    expect(AlertService.list()[0].content).toBe("a content");
    expect(AlertService.list().length).toBe(1);
  }));

  it("should remove an alert", inject((AlertService:service.contract.AlertService) => {
    var alert = AlertService.add({ content: "a content", title: "a title" });
    AlertService.remove(alert);
    expect(AlertService.list().length).toBe(0);
  }));

  it("should remove old alerts", inject((AlertService:service.contract.AlertService, $interval:any) => {
    AlertService.add({ content: "some content", date: new Date(2013, 5, 13, 0, 0, 0, 0) });
    expect(AlertService.list().length).toBe(1);
    $interval.flush(1000);
    expect(AlertService.list().length).toBe(0);
  }));

  it("should not remove new alerts", inject((AlertService:service.contract.AlertService, $interval:any) => {
    AlertService.add({ content: "some content", time: new Date() });
    expect(AlertService.list().length).toBe(1);
    $interval.flush(1000);
    expect(AlertService.list().length).toBe(1);
  }));
});
