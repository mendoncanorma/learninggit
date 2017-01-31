$.mockJSON.data.PRODUCTNAME = [
    'T-SHIRT', 'SHIRT', 'TROUSERS', 'JEANS', 'SHORTS', 'GLOVES', 'TIE'
];

$.mockjax({
    url: '/products',
    type: 'GET',
    dataType: 'json',
    responseTime: 750,
    status: 200,
    responseText: $.mockJSON.generateFromTemplate({
        'data|5-5': [{
            'id|1-100': 0,
            'name': '@PRODUCTNAME',
            'price|10-500': 0,
            'stock|1-9': 0
        }]
    })
});

/* ************************************************************************************ */

$.mockjax({
    url: /^\/products\/([\d]+)$/,
    type: 'GET',
    dataType: 'json',
    responseTime: 750,
    responseText: $.mockJSON.generateFromTemplate({
        "data": {
            "description": "@LOREM_IPSUM"
        }
    })
});

/* ************************************************************************************ */

$.mockjax({
    url: '/products',
    type: 'POST',
    dataType: 'json',
    responseTime: 750,
    status: 200,
    responseText: $.mockJSON.generateFromTemplate({
        "data": {
            "text": Math.floor((Math.random() * 10) + 1)
        }
    })
});
