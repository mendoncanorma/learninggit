var Product = function (id, name, price, stock) {
    "use strict";
    
    var 
        _id = ko.observable(id),
        _name = ko.observable(name),
        _price = ko.observable(price),
        _stock = ko.observable(stock);
    
    var _lineColor = ko.computed ( function () {
        return (_stock() < 15)? 'yellow' : 'transparent';   
    });
    
    var _hasStock = ko.computed(function(){
        return (_stock() < 15)? "stock-alert" : "";
    });    

    return {
        id: _id,
        name: _name,
        price: _price,
        stock: _stock,
        hasStock: _hasStock,
        lineColor: _lineColor        
    };
};