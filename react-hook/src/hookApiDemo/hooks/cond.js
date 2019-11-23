import React, {useState} from 'react';

export default () => {
    const [flag, setFlag] = useState(false)

    if(flag) {
        const [num, setNum] = useState(0)
    }
    return <button onClick={() => setFlag(!flag)}>click me</button>
}
