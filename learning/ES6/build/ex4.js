"use strict";
var __moduleName = (void 0);
var receive = (function() {
  var complete = arguments[$traceurRuntime.toProperty(0)] !== (void 0) ? arguments[$traceurRuntime.toProperty(0)] : (function() {
    return console.log("complete");
  });
  return complete();
});
receive();
