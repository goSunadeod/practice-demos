import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import UseState from './api/useState';

ReactDOM.render(
  <div>
    <ul>
      <li><a href="#/">Home</a></li>
      <li><a href="#/useState">UseState</a></li>
      <li><a href="#/useEffect">UseEffect</a></li>
      <li><a href="#/useContext">UseContext</a></li>
      <li><a href="#/useReducer">UseReducer</a></li>
      <li><a href="#/useCallback">UseCallback</a></li>
      <li><a href="#/useMemo">UseMemo</a></li>
      <li><a href="#/useRef">UseRef</a></li>
      <li><a href="#/mobx">Mobx</a></li>
      <li><a href="#/memoized">Memoized</a></li>
    </ul>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/useState" component={UseState}></Route>
      </Switch>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
