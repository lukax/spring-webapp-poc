///<reference path="./../../../ts-definitions/angularjs/angular.d.ts"/>
///<reference path="./../../../ts-definitions/angularui/angular-ui.d.ts"/>
///<reference path="./../../../ts-definitions/backbone/backbone.d.ts"/>
///<reference path="./../../../ts-definitions/jquery/jquery.d.ts"/>
///<reference path="./../../../ts-definitions/requirejs/require.d.ts"/>
///<reference path="./../../../ts-definitions/linq/linq.d.ts"/>
///<reference path="./../../../ts-definitions/d3/d3.d.ts"/>

///<reference path="./controller/base/Controller.ts"/>
///<reference path="./controller/base/ViewModel.ts"/>
///<reference path="./controller/product/EditProductController.ts"/>
///<reference path="./controller/product/ListProductController.ts"/>
///<reference path="./controller/user/AuthUserController.ts"/>
///<reference path="./controller/user/BoardUserController.ts"/>
///<reference path="./controller/MainNavbarController.ts"/>

///<reference path="./domain/base/AbstractEntity.ts"/>
///<reference path="./domain/util/Alert.ts"/>
///<reference path="./domain/util/Error.ts"/>
///<reference path="./domain/Product.ts"/>
///<reference path="./domain/User.ts"/>
///<reference path="./domain/Order.ts"/>

///<reference path="./directive/LabeledInputDirective.ts"/>

///<reference path="./modularity/AppModule.ts"/>
///<reference path="./modularity/ControllerModule.ts"/>
///<reference path="./modularity/DirectiveModule.ts"/>
///<reference path="./modularity/FilterModule.ts"/>
///<reference path="./modularity/ServiceModule.ts"/>

///<reference path="./service/contract/base/EntityService.ts"/>
///<reference path="./service/contract/util/AlertService.ts"/>
///<reference path="./service/contract/util/NavigationService.ts"/>
///<reference path="./service/contract/AuthService.ts"/>
///<reference path="./service/contract/ProductService.ts"/>
///<reference path="./service/contract/UserService.ts"/>

///<reference path="./service/impl/base/EntityServiceImpl.ts"/>
///<reference path="./service/impl/util/AlertServiceImpl.ts"/>
///<reference path="./service/impl/ProductServiceImpl.ts"/>

///<reference path="./service/mock/AuthServiceMock.ts"/>
///<reference path="./service/mock/ProductServiceMock.ts"/>
///<reference path="./service/mock/UserServiceMock.ts"/>
///<reference path="./service/mock/base/EntityServiceMock.ts"/>

///<reference path="./util/StdUtil.ts"/>
///<reference path="./util/DependencyManager.ts"/>
///<reference path="./util/Progress.ts"/>

declare var dc: any;
declare var crossfilter: any;
