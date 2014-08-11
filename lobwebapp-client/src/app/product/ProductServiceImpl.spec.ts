///<reference path="../reference.ts"/>

describe('service: ProductService', () => {
  var apiUrl:string = "/api/v1/product";
  var sampleProduct:product.Product = { id: 1, name: "Notebook", description: "Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB", quantity: 9, costPrice: 2102.30, price: 2699.00, category: "Inform�tica/Computadores", ncm: "8471.30.19" };

  beforeEach(
    module("lwa.product", ($provide:ng.auto.IProvideService) => {
      $provide.constant("apiUrl", apiUrl);
    })
  );

  it("should retrieve a list of category", inject((ProductService:product.ProductService, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucList"),
      errSpy = jasmine.createSpy("errList");

    $httpBackend.expectGET(apiUrl).respond(200, [sampleProduct]);
    ProductService.listCategory(sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(errSpy).not.toHaveBeenCalled();
  }));

  it("should find by name", inject((ProductService:product.ProductService, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucList"),
      errSpy = jasmine.createSpy("errList");
    var page:core.Page = { index: 0, size: 50 };
    var params = { name: "%" + sampleProduct.name + "%" };
    var url = apiUrl + "?" + $.param(params);

    $httpBackend.expectGET(url, {
      page_index: page.index,
      page_size: page.size,
      Accept: "application/json, text/plain, */*" })
      .respond(200, sampleProduct);

    ProductService.findByName(sampleProduct.name, sucSpy, errSpy, page);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(errSpy).not.toHaveBeenCalled();
  }));

});
