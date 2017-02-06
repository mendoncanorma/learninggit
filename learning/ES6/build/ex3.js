"use strict";
var __moduleName = (void 0);
var deliveryBoy = {
  name: "John",
  handleMessage: function(message, handler) {
    handler(message);
  },
  receive: function() {
    var $__0 = this;
    this.handleMessage("Hello, ", (function(message) {
      return console.log(message + $__0.name);
    }));
  }
};
deliveryBoy.receive();
