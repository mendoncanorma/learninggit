$(function(){
  // create the list icon
  $('#page .header-container .header-content .wrapper')
  .append('<li><a href="#" title="" class="list-link"><span class="list-icon"></span></a></li>');
  // insert the list content after the icon
  $('#page>.header-container>.header-content>.wrapper>li>.list-link')
  .append($('#list-product-header'));
  // toggle display on click
  $('#page>.header-container>.header-content>.wrapper').on('click','>li>.list-link', function (e) {
    e.preventDefault();
    $('#list-product-header').toggleClass('display');
  });
});
