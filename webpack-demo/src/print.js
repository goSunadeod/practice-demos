import $ from 'jquery';
export default function printMe() {
  console.log($('#app'), 'I get called from print.js!');
}
