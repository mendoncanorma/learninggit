(function () {

   function registerPartials () {
      Handlebars.registerPartial('dog', $('#dog-template').html());
   };

   Handlebars.registerHelper('getLanguageFilter', function (langId) {
      var queryParam = '';
      if (langId) {
         queryParam = '&language=' + Handlebars.escapeExpression(langId);
      }
      return new Handlebars.SafeString(queryParam);
   });

   function attachDogButtons () {

      $('.dog-button').click(function () {
         var id = $(this).closest('.dog-card').data('dog-id');
         DogPack.chooseDog(id);
         renderDogs();
      });

      $('.not-dog-button').click(function () {
         var id = $(this).closest('.dog-card').data('dog-id');
         DogPack.chooseNotDog(id);
         renderDogs();
      });

   }

   function renderPage () {
      var template = $('#index-template').html(),
         compiled = Handlebars.compile(template),
         rendered = compiled(window.language);

      $('#main').html(rendered);

      $('#languageSwitch').click( function () {
         DogPack.switchLanguage();
      });

      $('#score').find('small').click(function () {
         DogPack.clearDogs();
         window.location.href = '?' + Handlebars.helpers.getLanguageFilter(window.language.langId);
      });
   }

   function renderDogs () {
      var filteredDogs = DogPack.getFilteredDogs(DogPack.dogs),
         data = {
                  dogs: DogPack.getPaginatedDogs(filteredDogs), 
                  language: window.language
               };

      var template      = $('#dogs-template').html(),
         compiled       = Handlebars.compile(template),
         rendered       = compiled(data);

      $('#theDogs').html(rendered);
      attachDogButtons();
   }  

   registerPartials();
   renderPage();
   renderDogs();

})();