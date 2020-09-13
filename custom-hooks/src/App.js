import React, { useEffect } from 'react';
import useDocumentTitle from './hooks/useDocumentTitle'
import useWindowSize from './hooks/useWindowSize'
import useInputValue from './hooks/useInputValue'
import useRaf from './hooks/useRaf'
import MyComponent from './demo/useComponentSize.jsx';
import './App.css';

function App() {
  useDocumentTitle('你好')
  // const size = useWindowSize()

  // useEffect(() => {
  //   console.log(size)
  // }, [size])
  const value = useRaf(5000);

  // const name = useInputValue("Jamie");
  return (
    <div className="App">
     <h3>custom-hooks</h3>
     {/* <MyComponent></MyComponent> */}
     {/* <input {...name} /> */}
     <p>{value}</p>
    </div>
  );
}

export default App;
