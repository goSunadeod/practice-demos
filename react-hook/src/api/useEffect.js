import React, { useState, useEffect, useRef } from 'react';

function Index() {
    const [count, setCount] = useState('1');
    // useEffect 会在浏览器绘制后延迟执行
    // 第二个参数 只有在name变化时 才会重新调用useEffect
    // 如果第二个参数为[] 则表示只在初始化时调用一次
    useEffect(() => {
        document.title = count;
        // 返回一个清除函数 类似于componentWillUnmount
        return () => {
            document.title = 'leave useEffect';
        }
    }, [count])
    return (
      <>
          <button onClick={() => setCount(count + 1)}>点击</button>
          {count}
      </>
    )
}

export default Index;
