import React, {useEffect, useLayoutEffect, useState} from 'react';

const colors = ['red', 'black', 'yellow'];

export default function EffectTimeDemo() {
    const [num, setNum] = useState(0)

    useEffect(() => {
        setInterval(() => {
            setNum(c => c === 2 ? 0 : c+1)
        }, 1000)
    }, [])

    // num改变，作用到dom之后 回调
    // useEffect(() => {
    //     alert(num)
    // })

    // num 改变但是在作用到dom之前触发
    useLayoutEffect(() => {
        alert(num)
    }) // 执行时机 和 componentDidMount 和 mountUpdate 相同

    return <div style={{background: colors[num]}}>effect demo</div>
}
