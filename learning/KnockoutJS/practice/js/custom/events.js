        
            $('body').on('click', '#confirmOrderBtn', function () {
                vm.showOrder();
            });

            $('body').on('click', '.add-unit', function () {
                var ctx = ko.contextFor(this);
                var data = ko.dataFor(this);

                // data.addUnit();
                $('body').trigger("addUnit", [data]);
            });

            $('body').on('click', '.remove-unit', function () {
                var data = ko.dataFor(this);
                console.log( data );
                
                // data.removeUnit();
                $('body').trigger("removeUnit", [data]);
            });

            $('body').on('addUnit', function (event, data) {
                // data.addUnit();
                CartProductService.addUnit(data);
            });

            $('body').on('removeUnit', function (event, data) {
                // data.removeUnit();
                CartProductService.removeUnit(data);
            });
        