///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
///<amd-dependency path="underscore"/>
import i0 = require("script/service/impl/ProductServiceImpl")

describe('service: ProductService', () => {
    beforeEach(() => {
        module(($provide: ng.auto.IProvideService) => {
            $provide.service("ProductService", i0.service.impl.ProductServiceImpl);
        });
    });

    var sampleProduct: domain.Product = { id: 1, name: "Notebook", description: "Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB", quantity: 9, costPrice: 2102.30, price: 2699.00, category: "Informática/Computadores", registerDate: new Date(12, 12, 12).getTime(), ncm: "8471.30.19" };

    it("should retrieve a list of category", inject((ProductService: d.service.contract.ProductService, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucList"),
            errSpy = jasmine.createSpy("errList");

        $httpBackend.expectGET("/api/product/category").respond(200, sampleProduct.category);
        ProductService.listCategory(sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(errSpy).not.toHaveBeenCalled();
    }));

    it("should find by name", inject((ProductService: d.service.contract.ProductService, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucList"),
            errSpy = jasmine.createSpy("errList");
        var page: domain.util.Page = { index: 0, size: 50 };
        var pageUrl = "?page=" + page.index + "&size=" + page.size;
        var productNameHeader = "%" + sampleProduct.name + "%";

        $httpBackend.expectGET("/api/product/" + pageUrl, { product_name: productNameHeader, Accept: "application/json, text/plain, */*" }).respond(200, sampleProduct);
        ProductService.findByName(sampleProduct.name, sucSpy, errSpy, page);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(errSpy).not.toHaveBeenCalled();
    }));

});