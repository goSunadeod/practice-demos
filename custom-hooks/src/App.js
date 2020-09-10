import React, { useEffect } from 'react';
import useDocumentTitle from './hooks/useDocumentTitle'
import useWindowSize from './hooks/useWindowSize'
import './App.css';

function App() {
  useDocumentTitle('你好')
  const size = useWindowSize()

  useEffect(() => {
    console.log(size)
  }, [size])
  return (
    <div className="App">
     <h3>custom-hooks</h3>
    </div>
  );
}

export default App;
