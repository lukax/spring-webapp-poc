///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../service/contract/ProductService.ts'/>

module controller{
    
    export interface EditProductViewModel extends ng.IScope {
        product: domain.Product;
        btnEsp: () => string; 
        saveProduct: () => void;
        updateProduct: () => void;
        removeProduct: () => void;
        saveChanges: () => void;
    }
    
    export class EditProductController {
        private scope: EditProductViewModel;
        private routeParams: any;
        private productService: service.contract.ProductService;
        private location: ng.ILocationService;
        
        constructor($productService: service.contract.ProductService, $scope: EditProductViewModel, 
                    $routeParams: ng.IRouteParamsService, $location: ng.ILocationService){
            this.scope = $scope;
            this.productService = $productService;
            this.routeParams = $routeParams;
            this.location = $location;
            
            this.retrieveProduct();
            
            this.scope.saveChanges = () => {
                if(this.scope.product.id == 0) this.saveProduct();
                else this.updateProduct();
            };
            this.scope.removeProduct = () => { 
                this.removeProduct()     
            };

            this.scope.btnEsp = () => { 
                if(this.scope.product != null && this.scope.product.id != 0)  return 'inherit'; 
                else return 'none';
            };
        }
        
        
        saveProduct(){
            this.productService.save(this.scope.product,
                        (successData: number, successStatus) => { this.location.url("/product/" + successData); }, 
                        (errorData, errorStatus) => {   });
        }
        
        updateProduct(){
            this.productService.update(this.scope.product,
                        (successData, successStatus) => {   }, 
                        (errorData, errorStatus) => {   });
        }

        removeProduct(){
            this.productService.remove(this.scope.product, 
                (successData, successStatus)=> {   }, 
                (errorData, errorStatus) => {   });                
                this.generateProduct();
        }
        
        retrieveProduct() {
            if(this.routeParams.productId == 0){
                this.generateProduct();
            }
            else{
                this.productService.findById(this.routeParams.productId, 
                        (successData, successStatus) => { this.scope.product = successData; },
                        (errorData, errorStatus)=>{ this.location.url('/product/0');  });
            }
        
        }

        generateProduct(){
            this.scope.product = new domain.Product(0,'',0,'');
        }


    }
}