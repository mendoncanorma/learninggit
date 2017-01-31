/*jshint browser: true, devel: true, jquery: true*/
var gec = {};

(function (win, $) {

  'use strict';

  var Common = {

    modules: [],

    footerSocialIcons: function () {
      $('div.footer-radial-pop nav').on('click', function () {
        $(this).toggleClass('clicked');
      });
    },

    init: function () {
      console.log('init common');

      Common.footerSocialIcons();
      alert("I am here");
    },

    initModules: function () {
      var mdl = 0;

      for (mdl = 0; mdl < Common.modules.length; mdl++) {
        Common.modules[mdl]();
      }
    }
  };

  gec.common = Common;

  gec.common.modules.push(gec.common.init);

  $(document).ready(function () {
    gec.common.initModules();
  });

})(window, jQuery);