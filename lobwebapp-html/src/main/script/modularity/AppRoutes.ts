export var routes =
[{
    "name": "user",
    "url": "/user",
    "templateUrl": "view/user/user.html",
    "controller": "",
    "dependencies": []
}, {
    "name": "user.board",
    "baseUrl": "/user",
    "url": "/user/board",
    "templateUrl": "view/user/boardUser.html",
    "controller": "BoardUserController",
    "dependencies": [
        "controller/user/BoardUserController"
    ]
}, {
    "name": "user.auth",
    "baseUrl": "/user",
    "url": "/user/auth",
    "templateUrl": "view/user/authUser.html",
    "controller": "AuthUserController",
    "dependencies": [
        "controller/user/AuthUserController"
    ]
}, {
    "name": "product",
    "url": "/product",
    "templateUrl": "view/product/product.html",
    "controller": "",
    "dependencies": []
}, {
    "name": "product.list",
    "baseUrl": "/product",
    "url": "/product/list?search",
    "templateUrl": "view/product/listProduct.html",
    "controller": "ListProductController",
    "dependencies": [
        "controller/product/ListProductController",
        "service/mock/ProductServiceMock"
    ]
}, {
    "name": "product.edit",
    "baseUrl": "/product",
    "url": "/product/{productId:[0-9]{1,8}|new}?priceInfo", //0-9 numbers in 1-8 digits long match
    "templateUrl": "view/product/editProduct.html",
    "controller": "EditProductController",
    "dependencies": [
        "controller/product/EditProductController",
        "service/mock/ProductServiceMock"
    ]
}, {
    "name": "product.graph",
    "baseUrl": "/product",
    "url": "/product/graph",
    "templateUrl": "view/product/graphProduct.html",
    "controller": "GraphProductController",
    "dependencies": [
        "controller/product/GraphProductController",
        "service/mock/ProductServiceMock"
    ]
}, {
    "name": "order",
    "url": "/order",
    "templateUrl": "view/order/order.html",
    "controller": "",
    "dependencies": []
},{
    "name": "order.edit",
    "baseUrl": "/order",
    "url": "/order/{productId:[0-9]{1,8}|new}", //0-9 numbers in 1-8 digits long match
    "templateUrl": "view/order/editOrder.html",
    "controller": "EditOrderController",
    "dependencies": [
        "controller/order/EditOrderController",
        "service/mock/ProductServiceMock"
    ]
}];