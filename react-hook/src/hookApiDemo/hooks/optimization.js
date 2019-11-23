import React, {useState, memo, useCallback, useMemo} from 'react';

function Counter() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('uzi')

      // config 是一个对象，在函数组件每次声明后，其内存地址都会改变，导致 其对比就是false，触发渲染
    // 依赖的count是一定要的 否则一直都是初始化 其实也是闭包陷阱
    const config = useMemo(() => ({
        text: `count is ${count}`,
        color: count > 3 ? 'red' : 'blue',
    }), [count])

    // 函数也是个对象
    const handleButtonClick = useCallback(() => setCount(count + 1), [count])

    // 不做优化前，更改name 也会触发child的重新渲染
    return (
      <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Child onButtonClick={handleButtonClick} config={config} />
      </div>
    )
}

//memo 就意味着 组件的更新只会依赖与props 其实对应着class组件的shouldComponentUpdate 方法
 const Child = memo(function Child({onButtonClick, config}) {
    console.log('child render')
    return (
      <button onClick={onButtonClick} style={{color: config.color}}>
          {config.text}
      </button>
    )
})

export default Counter
