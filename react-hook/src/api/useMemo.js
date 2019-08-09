import React, { useState, useEffect, useCallback, useMemo } from 'react';


function Foo (props) {
    return (
      <h1>{props.count}</h1>
    )
}
function Index () {
    const [count, setCount] = useState(0);

    const double = useMemo(() => {
        return count * 2
    }, [count])

    return (
      <div>
          <button type="button"
                  onClick={() => {setCount(count + 1) }}
          >
              Click({count}) double: ({double})
          </button>
          <Foo count={count}/>
      </div>
    )
}


export default Index;
