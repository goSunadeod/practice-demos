import React, { useState, useCallback, useMemo, memo } from 'react';

const Foo = memo (function Foo (props) {
    console.log('Counter render')
    return (
      <h1 onClick={props.onClick}>点击{props.count}</h1>
    )
})

function Index (props) {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const double = useMemo(() => {
        return count * 2
    }, [count === 3])

    // const onClick = () => {
    //     console.log('Click')
    // }

    // const onClick = useCallback(() => {
    //     console.log('Click')
    // },[])

    // const onClick = useCallback(() => {
    //     console.log('Click')
    //     setClickCount(clickCount + 1)
    // },[clickCount, setClickCount])

    const onClick = useCallback(() => {
        console.log('Click')
        setClickCount((clickCount) => clickCount + 1)
    },[])

    return (
      <div style={{padding:'100px'}}>
          <button type="button"
                  onClick={() => {setCount(count + 1) }}
          >
              Click({count}{clickCount}) double: ({double})
          </button>
          <Foo count={double} onClick={onClick} />
      </div>
    )
}

export default Index