(function ($) {

    var vm = (function () {

        /* Start : Catalog */
        var catalog = ko.observableArray([
            Product(1, "T-Shirt", 10.00, 20),
            Product(2, "Trousers", 20.00, 10),
            Product(3, "Shirt", 15.00, 20),
            Product(4, "Shorts", 5.00, 10)
        ]);

        var newProduct = Product("", "", "", "");

        var clearNewProduct = function (data) {
            data.id("");
            data.name("");
            data.price("");
            data.stock("");
        };

        var addProduct = function addProduct (data) {
            var tmpNewProduct = Product(data.id(), data.name(), data.price(), data.stock());

            ProductResource
                .create(ko.toJS(data))
                .done(function (response) {
                    console.log(response.data.text);
                    catalog.push(tmpNewProduct);
                    filteredCatalog( catalog() );
                    clearNewProduct(data);
                });
            
        };
        /* End : Catalog */


        /* Start : Search */
        var showSearchBar = ko.observable(true);

        var searchTerm = ko.observable("");

        /*
        var filteredCatalog = ko.computed(function () {
            // if catalog is empty return empty array
            if (!catalog) {
                return [];
            }

            // if filter is empty, return catalog
            var filter = searchTerm().toLowerCase();
            if (!filter) {
                return catalog();
            }

            // filter data
            var filtered = ko.utils.arrayFilter(catalog(), function (item) {
                var fields = ["name"];
                var i = fields.length;
                var incatalog = false;

                while (i--) {
                    var prop = fields[i];
                    var strProp = ko.unwrap(item[prop]).toLocaleLowerCase();
                    if (strProp.indexOf(filter) !== -1){
                        incatalog = true;
                        break;
                    };                        
                }
                return incatalog;
            });

            return filtered;

        });
        */

        var filteredCatalog = ko.observableArray(catalog());

        var filterCatalog = function () {
            if (!catalog()) {
                filteredCatalog([]);
            }

            var filter = searchTerm().toLowerCase();
            if (filter) {
                filteredCatalog(catalog());    
            }

            // filter data
            var filtered = ko.utils.arrayFilter(catalog(), function (item) {
                var fields = ["name"];
                var i = fields.length;
                var incatalog = false;

                while (i--) {
                    var prop = fields[i];
                    var strProp = ko.unwrap(item[prop]).toLocaleLowerCase();
                    if (strProp.indexOf(filter) !== -1){
                        incatalog = true;
                        break;
                    };                        
                }
                return incatalog;
            });

            filteredCatalog(filtered);            
        };
        /* End : Search */


        /* Start : Cart */
        var cart = ko.observableArray([]);

        var cartHasProducts = ko.computed(function () {
            return (cart().length > 0);
        }, this);

        /*
        var showCartDetails = function () {
            if (cart().length > 0) {
                // $('#cartContainer').removeClass('hidden');
                visibleCart(true);
            }
        };

        var hideCartDetails = function () {
            // $('#cartContainer').addClass('hidden');
            visibleCart(false);
        };
        */            

        var addToCart = function (data) {
            var i,
                len     = cart().length,
                item    = null;

            for (i=0; i<len; i++) {
                if (data.id() === cart()[i].product.id()) {
                    item = cart()[i];
                    break;
                }
            }

            if (item) {
                item.addUnit();
            } else {
                item = CartProduct(data, 0);
                item.addUnit();
                cart.push(item);
            }
        };

        var removeFromCart = function (data) {
            var u       = data.units();
            var stock   = data.product.stock();

            data.product.stock(stock + u);
            cart.remove(data);
        };
        /* End : Cart */


        /* Start: Cart Widget */
        var totalItems = ko.computed(function () {
            var i,
                len     = cart().length,
                item    = null,
                total   = 0;

            for (i=0; i<len; i++) {
                total = total + cart()[i].units();                   
            }

            return total;
        });

        var grandTotal = ko.computed(function () {
            var i,
                len     = cart().length,
                item    = null,
                total   = 0;

            for (i=0; i<len; i++) {
                total = total + cart()[i].units() * cart()[i].product.price();                   
            }

            return total;
        });            
        /* End: Cart Widget */


        /* Start: Order */
        var showOrder = function () {
            // $("#catalogContainer").addClass("hidden");
            // $("#orderContainer").removeClass("hidden");

            visibleCatalog(false);
        };

        var showCatalog = function () {
            // $("#catalogContainer").removeClass("hidden");
            // $("#orderContainer").addClass("hidden");

            visibleCatalog(true);
        };

        var finishOrder = function () {
            cart([]);
            // hideCartDetails();
            visibleCart(false);
            showCatalog();
            $("#finishOrderModal").modal('show');                                
        };
        /* End: Order */


        /* Start: Toggles */
        var visibleCatalog = ko.observable(true);
        var visibleCart = ko.observable(false);            
        /* End: Toggles */


        /* Start : Debug */
        var debug = ko.observable(false);
        var showDebug = function () {
            debug(true);
        };
        var hideDebug = function () {
            debug(false);
        }            
        /* End : Debug */


        /* Start : Crud */
        var showDescription = function (data) {
            var prm = ProductResource.get(data.id());

            prm.done(function(response){
                alert(response.data.description);
            });
        };

        var allCallbackSuccess = function (response) {
            catalog([]);

            response.data.forEach(function (item) {
                catalog.push( Product(item.id, item.name, item.price, item.stock) );
            });

            filteredCatalog( catalog() );
            ko.applyBindings(vm);
        };

        var activate = function (response) {
            ProductResource
                .all()
                .done(allCallbackSuccess);
        };
        /* End : Crud */

        return {
            showSearchBar: showSearchBar,
            searchTerm: searchTerm,

            catalog: filteredCatalog,
            filterCatalog: filterCatalog,
            newProduct: newProduct,
            addProduct: addProduct,

            cart: cart,
            cartHasProducts: cartHasProducts,
            // showCartDetails: showCartDetails,
            // hideCartDetails: hideCartDetails,
            // addToCart: addToCart,
            removeFromCart: removeFromCart,

            totalItems: totalItems,
            grandTotal: grandTotal,

            showOrder: showOrder,
            showCatalog: showCatalog,
            finishOrder: finishOrder,

            visibleCatalog: visibleCatalog,
            visibleCart: visibleCart,

            debug: debug,
            showDebug: showDebug,
            hideDebug: hideDebug,

            activate: activate,
            showDescription: showDescription
        };

    })();

    window.vm = vm;

    // ko.applyBindings(vm);
    vm.activate();

})(jQuery);        