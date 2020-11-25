const div = document.createElement('div')
console.log(module.hot)
if(module.hot) {
  module.hot.accept('./hello.js', function() {
      console.log(2121211)
      div.innerHTML = '112121'
      document.body.appendChild(div)
  })
}
