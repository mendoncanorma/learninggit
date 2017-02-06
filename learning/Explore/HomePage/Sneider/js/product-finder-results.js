$(function () {
  /* filters data structure
   *	{
   *		category: {
   *			characteristic: [ value ], ...
   *		}, ...
   *	}
   */
  var filters = {};
  buildFiltersFromMarkup();
  var page = 1;
  var limit = 10;
  var id = location.pathname.split('/')[2];

  /* Fetch the datas from the server to display
   * category (string): the category of the characteristic
   * characteristic (string): the name of the characteristic
   * value (string): the value of the characteristic
   * callback (function): the success callback
   */
  function fetchProductWithFilters(callback){
    // do the ajax request
    $.get('/product-finder-results/', {
      id: id, filters: filters,
      page: page, limit: limit
    })
    .success(function(data, status, xhr){
      callback(data);
    })
    .error(function (data, status, xhr) {
      console.log('nop');
    });
  }

  function reloadContent(){
    fetchProductWithFilters(function(data){
      injectNewContent(data);
    });
  }

  function injectNewContent(data) {
    console.log(data);
    $('.product-number').text(data.productNumber);
    $('#products-found > div.columns > div.side-bar > ul .result-filter').
      replaceWith(data.filters);
    $('#products-found > div.columns > ul.products-list').
      replaceWith(data.products);
    $('#products-found > div.bottom-navigation').
      replaceWith(data.navigation);
  }

  function addToFilters(category, characteristic, value) {
    if(!filters[category]) filters[category] = {};
    if(!filters[category][characteristic]) filters[category][characteristic] = [];
    // add the value (and remove the count number in parenths)
    filters[category][characteristic].push(value.replace(/\(\d\)$/,''));
    page = 1;
  }

  $('#products-found > div.list-bar > h3').click(function () {
    console.log(buildFiltersFromMarkup());
  });

  function buildFiltersFromMarkup(){
    var elements = $('.selection > div > li > *').get();
    if(elements.length === 0) return;
    var category = '';
    var characteristic = '';
    var value = '';

    for(var i in elements){
      var element = $(elements[i]);
      var type = element[0].localName;
      var text = element[0].innerText;
      if(type === 'h3'){
        category = text;
      } else if(type === 'p'){
        characteristic = text.replace(/\s:$/, '');
      } else if (type === 'ul'){
        var values = element.find('li').get();
        for(var j in values){
          value = values[j].innerText;
          addToFilters(category, characteristic, value);
        }
      }
    }
  }

  function removeFromFilters(category, characteristic, value) {
    var index = filters[category][characteristic].indexOf(value);
    if(index > -1){
      filters[category][characteristic].splice(index, 1);
      if(filters[category][characteristic].length === 0) delete filters[category][characteristic];
      if($.isEmptyObject(filters[category])) delete filters[category] ;
    }
    page = 1;
  }

  $('#products-found .columns .side-bar')
  .on('click','.result-filter>li>div>ul>li',function(e){
    var element = $(e.target);
    var value = element.text();
    var characteristic = element.parent('ul').prev('h4').text();
    var category = element.parent('ul').prev('h4').parent('div').prev('h3').text();

    addToFilters(category, characteristic, value);
    reloadContent();
  });

  $('#products-found .columns .side-bar')
  .on('click','.clear-filters',function(e){
    e.preventDefault();
    filters = {};
    reloadContent();
  });

  $('#products-found .columns .side-bar')
  .on('click','.remove-all',function(e){
    e.preventDefault();
    filters = {};
    reloadContent();
  });

  $('#products-found .columns .side-bar ')
  .on('click','.result-filter .selection>div>li>ul>li a.cross',function(e){
    e.preventDefault();
    var element = $(e.target).parent('li');
    var value = element.text();
    var characteristic = element.parent('ul').prev('p').text().replace(/ :$/,'');
    var category = element.parent('ul').prevAll('h3').text();

    removeFromFilters(category, characteristic, value);
    reloadContent();
  });

  $('#products-found').on('click', 'div.bottom-navigation > ul > li > a', function (e){
    e.preventDefault();
    page = parseInt($(e.target).attr('href'));
    reloadContent();
  });

  $('#products-found .columns .side-bar').on('click','.result-filter li > h3', function(e){
    $(this).parent('li').toggleClass('open').children('div').slideToggle();
    e.stopPropagation();
  });
  $('#products-found .columns .side-bar').on('click','.result-filter li div h4', function(e){
    $(this).next('ul').slideToggle();
    e.stopPropagation();
  });

});
