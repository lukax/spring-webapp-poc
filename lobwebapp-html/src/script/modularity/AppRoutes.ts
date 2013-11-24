export var routes =
[{
    "name": "user",
    "url": "/user",
    "templateUrl": "view/user/user.html",
    "controller": "",
    "deps": []
}, {
    "name": "user.board",
    "baseUrl": "/user",
    "url": "/user/board",
    "templateUrl": "view/user/boardUser.html",
    "controller": "BoardUserController",
    "deps": [
        "controller/user/BoardUserController"
    ]
}, {
    "name": "user.auth",
    "baseUrl": "/user",
    "url": "/user/auth?error",
    "templateUrl": "view/user/authUser.html",
    "controller": "AuthUserController",
    "deps": [
        "controller/user/AuthUserController",
        //"service/impl/AuthServiceImpl"
        "service/mock/AuthServiceMock"
    ]
}, {
    "name": "product",
    "url": "/product",
    "templateUrl": "view/product/product.html",
    "controller": "",
    "deps": []
}, {
    "name": "product.list",
    "baseUrl": "/product",
    "url": "/product/list?search&redirect",
    "templateUrl": "view/product/listProduct.html",
    "controller": "ListProductController",
    "deps": [
        "controller/product/ListProductController",
        //"service/impl/ProductServiceImpl"
        "service/mock/ProductServiceMock"
    ]
}, {
    "name": "product.edit",
    "baseUrl": "/product",
    "url": "/product/{productId:[0-9]{1,8}|new}?priceInfo", //0-9 numbers in 1-8 digits long match
    "templateUrl": "view/product/editProduct.html",
    "controller": "EditProductController",
    "deps": [
        "controller/product/EditProductController",
        //"service/impl/ProductServiceImpl"
        "service/mock/ProductServiceMock"
    ]
}, {
    "name": "product.graph",
    "baseUrl": "/product",
    "url": "/product/graph",
    "templateUrl": "view/product/graphProduct.html",
    "controller": "GraphProductController",
    "deps": [
        "controller/product/GraphProductController",
        //"service/impl/ProductServiceImpl"
        "service/mock/ProductServiceMock"
    ]
}, {
    "name": "order",
    "url": "/order",
    "templateUrl": "view/order/order.html",
    "controller": "",
    "deps": []
},{
    "name": "order.edit",
    "baseUrl": "/order",
    "url": "/order/{orderId:[0-9]{1,8}|new}?clientId&productId", //0-9 numbers in 1-8 digits long match
    "templateUrl": "view/order/editOrder.html",
    "controller": "EditOrderController",
    "deps": [
        "controller/order/EditOrderController",
        //"service/impl/ProductServiceImpl",
        "service/mock/ProductServiceMock",
        //"service/impl/ClientServiceImpl"
        "service/mock/ClientServiceMock"
    ]
}];