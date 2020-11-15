'use strict';

Array.prototype.unique = function () {
  console.log('ni'); // 将 array 中的重复元素去除
};

var baz = function baz() {
  var x = 1;
  console.log(x);

  return x;
};

baz();
