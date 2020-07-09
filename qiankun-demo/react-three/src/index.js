import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import './public-path';

const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react-three" : "";

function render() {
  ReactDOM.render(
    <HashRouter basename={BASE_NAME}>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/Home" component={Home}></Route>
      </Switch>
    </HashRouter>,
    document.getElementById("root"));
}

// 生命周期 - 挂载前
export async function bootstrap(props) {
  console.log('react-three bootstrap');

}
// 生命周期 - 挂载后
export async function mount() {
  console.log('react-three mount');
  // 渲染
  render()
}
// 生命周期 - 解除挂载
export async function unmount() {
  console.log('react-three unmount');
}

// 本地调试
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}