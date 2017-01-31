var Product = function (id, name, price, stock) {
	"use strict";

	var _id 	= ko.observable(id),
		_name 	= ko.observable(name),
		_price 	= ko.observable(price),
		_stock 	= ko.observable(stock);

	var _lineColor = ko.computed(function () {
		if (_stock() < 15) {
			return "red";
		} else {
			return "green";
		}
	});

	var _hasStock = ko.computed(function () {
		return (_stock() < 15) ? "stock-alert":"";
	});

	/*
	var decreaseStock = function () {
		var s = _stock();
		if (s > 0) {
		    s--;
		}
		_stock(s);
	};
	*/

	return {
		id: 	_id,
		name: 	_name,
		price: 	_price,
		stock: 	_stock,
		lineColor: _lineColor,
		hasStock: _hasStock,
		// decreaseStock: decreaseStock
	};
};