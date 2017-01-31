"use strict";
var __moduleName = (void 0);
function varFunc() {
  var previous = 0;
  var current = 1;
  var i;
  var temp;
  for (i = 0; i < 10; i += 1) {
    temp = previous;
    previous = current;
    current = temp + current;
  }
  console.log(current);
}
function letFunc() {
  var previous = 0;
  var current = 1;
  {
    try {
      throw undefined;
    } catch ($i) {
      $i = 0;
      for (; $i < 10; $i += 1) {
        try {
          throw undefined;
        } catch (i) {
          i = $i;
          try {
            try {
              throw undefined;
            } catch (temp) {
              temp = previous;
              previous = current;
              current = temp + current;
            }
          } finally {
            $i = i;
          }
        }
      }
    }
  }
  console.log(current);
}
varFunc();
letFunc();
