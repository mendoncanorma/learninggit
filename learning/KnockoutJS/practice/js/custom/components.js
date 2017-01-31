ko.components.register('add-to-cart-button', {

	viewModel: function (params) {
		this.item = params.item;
		this.cart = params.cart;

		this.addToCart = function () {
            var i,
                len     = this.cart().length,
                item    = null;

            for (i=0; i<len; i++) {
                if (this.item.id() === this.cart()[i].product.id()) {
                    item = this.cart()[i];
                    break;
                }
            }

            if (item) {
                // item.addUnit();
                CartProductService.addUnit(item);
            } else {
                item = new CartProduct(this.item,1);
                this.cart.push(item);
                // item.product.decreaseStock(1);
                ProductService.decreaseStock(item.product);
            }            
		};
	},

	template: '<button class="btn btn-primary" data-bind="click: addToCart"><i class="glyphicon glyphicon-plus-sign"></i> Add</button>'	

});