var ProductResource = (function () {
    function all() {
        return $.ajax({
            cache: false,
            dataType:'json',
            type: 'GET',
            url: '/products'
        });
    }

    function get(id) {
        return $.ajax({
            cache: false,
            dataType:'json',
            type: 'GET',
            url: '/products/'+id
        });
    }

    function create(product) {
        return $.ajax({
            cache: false,
            datatype:'json',
            type: 'POST',
            url: '/products',
            data: product
        });        
    }

    function update(product) {
        return $.ajax({
            cache: false,
            datatype:'json',
            type: 'PUT',
            url: '/products/'+product.id,
            data: product
        });        
    }

    function remove(id) {
        return $.ajax({
            cache: false,
            datatype:'json',
            type: 'DELETE',
            url: '/products/'+id
        });
    }
    
    return {
        all: all,
        get: get,
        create: create,
        update: update,
        remove: remove
    };
})();