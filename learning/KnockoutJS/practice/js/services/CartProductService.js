var CartProductService = (function () {

	var _addUnit = function (cartItem) {
		var u 		= cartItem.units(),
			stock	= cartItem.product.stock();

		if ( stock === 0) {
			return;
		}

		cartItem.units(u+1);
		cartItem.product.stock(stock-1);
	};

	var _removeUnit = function (cartItem) {
		var u 		= cartItem.units(),
			stock	= cartItem.product.stock();

		if ( u === 0) {
			return;
		}

		cartItem.units(u-1);
		cartItem.product.stock(stock+1);
	};

	return {
		addUnit: _addUnit,
		removeUnit: _removeUnit
	};	

})();