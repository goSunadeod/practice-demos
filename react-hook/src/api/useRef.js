import React, { useRef, useState, useEffect} from 'react';

function useCount(defaultCount) {
    const [count, setCount] = useState(defaultCount);
    const it = useRef()

    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
    } , [])

    useEffect(() => {
        if (count >= 5) {
            clearInterval(it.current)
        }
    })

    return [count, setCount]
}

function Index() {
    const inputEl = useRef(null);
    const [count, setCount] = useCount(0);
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };

    return (
      <>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
          <h1>{count}</h1>
      </>
    );
}

export default Index;