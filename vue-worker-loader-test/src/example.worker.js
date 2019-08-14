self.onmessage = function (event) {
  const data = event.data;
  const ans = fibonacci(data.message);
  self.postMessage(ans);
};

function fibonacci(n) {
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}