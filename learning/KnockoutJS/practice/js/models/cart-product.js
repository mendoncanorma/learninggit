var CartProduct = function (product, units) {
	"use strict";

	var _product 	= product,
		_units 		= ko.observable(units);

	/*
	var _addUnit = function () {
		var u 		= _units(),
			stock	= _product.stock();

		if ( stock === 0) {
			return;
		}

		_units(u+1);
		_product.stock(stock-1);
	};

	var _removeUnit = function (data) {
		var u 		= _units(),
			stock	= _product.stock();

		if ( u === 0) {
			return;
		}

		_units(u-1);
		_product.stock(stock+1);
	};
	*/

	var subtotal = ko.computed(function () {
		var u 		= _units(),
			price 	= _product.price();

		return (u * price);
	});

	return {
		product: _product,
		units: _units,

		// addUnit: _addUnit,
		// removeUnit: _removeUnit,

		subtotal: subtotal
	};
}