///<reference path="../../reference.ts"/>

describe("service: AlertService", () => {
  var AlertService: entity.AlertService;

  beforeEach(module("lwa.entity"));
  beforeEach(inject((_AlertService_:entity.AlertService) => {
    AlertService = _AlertService_;
  }));

  it("should retrieve an alert", () => {
    expect(AlertService.list()).toBeDefined();
    expect(AlertService.list()).toEqual(jasmine.any(Array));
  });

  it("should add an alert", () => {
    AlertService.add({ content: "a content", title: "a title" });
    expect(AlertService.list()[0].content).toBe("a content");
    expect(AlertService.list().length).toBe(1);
  });

  it("should remove an alert", () => {
    var alert = AlertService.add({ content: "a content", title: "a title" });
    AlertService.remove(alert);
    expect(AlertService.list().length).toBe(0);
  });

  it("should remove old alerts", inject(($interval:any) => {
    AlertService.add({ content: "some content", date: new Date(2013, 5, 13, 0, 0, 0, 0) });
    expect(AlertService.list().length).toBe(1);
    $interval.flush(1000);
    expect(AlertService.list().length).toBe(0);
  }));

  it("should not remove new alerts", inject(($interval:any) => {
    AlertService.add({ content: "some content", time: new Date() });
    expect(AlertService.list().length).toBe(1);
    $interval.flush(1000);
    expect(AlertService.list().length).toBe(1);
  }));
});
