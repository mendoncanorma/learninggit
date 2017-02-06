var ProductService = (function () {

	var hasStock = function (product) {		
		return (product.stock() < 15) ? "stock-alert":"";
	};

	var decreaseStock = function (product) {
		var s = product.stock();
		if (s > 0) {
		    s--;
		}
		product.stock(s);
	};

	return {
		hasStock: hasStock,
		decreaseStock: decreaseStock				
	};

})();