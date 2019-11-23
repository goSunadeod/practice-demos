import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import UseState from './api/useState';
import UseEffect from './api/useEffect';
import UseRef from './api/useRef';
import UseContext from './api/useContext';
import UseCallback from './api/useCallback';
import UseReducer from './api/useReducer';
import UseMemo from './api/useMemo';
import Memoized from './api/memoized';
import TodoList from './todoList';
// import Lesson from './hookApiDemo/App';
// import Lesson from './hookApiDemo/hooks/App';
// import Lesson from './hookApiDemo/hooks/ref-demo';
// import Lesson from './hookApiDemo/hooks/effect-time-demo';
// import Lesson from './hookApiDemo/hooks/optimization';
// import Lesson from './hookApiDemo/hooks/closure';
import Lesson from './hookApiDemo/hooks/cond';

// app -> object(Fiber) -> [hook1, hook2, hook3, hook4]
// hook的 执行顺序 数量都不能变
ReactDOM.render(
  <div>
    <ul>
      <li><a href="#/">Home</a></li>
      <li><a href="#/useState">UseState</a></li>
      <li><a href="#/useEffect">UseEffect</a></li>
        <li><a href="#/useRef">UseRef</a></li>
      <li><a href="#/useContext">UseContext</a></li>
      <li><a href="#/useCallback">UseCallback</a></li>
        <li><a href="#/useReducer">UseReducer</a></li>
      <li><a href="#/useMemo">UseMemo</a></li>
      <li><a href="#/memoized">Memoized</a></li>
      <li><a href="#/todo">TodoList</a></li>
      <li><a href="#/lesson">Lesson</a></li>
    </ul>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/useState" component={UseState}></Route>
        <Route exact path="/useEffect" component={UseEffect}></Route>
        <Route exact path="/useRef" component={UseRef}></Route>
        <Route exact path="/useContext" component={UseContext}></Route>
        <Route exact path="/useCallback" component={UseCallback}></Route>
        <Route exact path="/useReducer" component={UseReducer}></Route>
        <Route exact path="/useMemo" component={UseMemo}></Route>
        <Route exact path="/memoized" component={Memoized}></Route>
        <Route exact path="/todo" component={TodoList}></Route>
        <Route exact path="/lesson" component={Lesson}></Route>
      </Switch>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
