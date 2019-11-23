import React, {
    useState,
    useReducer,
    useContext,
    useEffect,
    useRef,
    createContext,
    Component } from 'react';
const Context = createContext('');

function textReducer(state, action) {
    switch(action.type) {
        case 'UPDATE':
            return action.value
        break;
        default:
            return state
    }
}

function App() {
    // useState 是 useReducer的简单实现，在内部实现也用到了useReducer
    // const [text, setText] = useState('');
    const [text, dispatchText] = useReducer(textReducer, '')
    const [count, setCount] = useState(0);
    const ref = useRef();

    const handleChange = (e) => {
        // setText(e.target.value)
        dispatchText({
            type: 'UPDATE',
            value: e.target.value
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            // ref.current.style.color = 'red'
            setCount(count + 1)
            // setCount(c => c + 1)
        }, 1000)

        return () => {
            console.log('unload')
            clearInterval(interval)
        }
    }, [count])

    // context渲染问题，传入对象，只依赖name，但age改变也会更新
    return (
      <Context.Provider value={{name: 'uzi', age: 18}}>
          <input ref={ref}
                 type="text"
                 value={text}
                 onChange={handleChange}
          />
          <button onClick={() => setCount(count +1 )}>{count}</button>
          <Child />
      </Context.Provider>
    )
}

// class Child extends Component {
//     static contextType = Context;
//     render() {
//         return (
//           <div>{this.context}</div>
//         )
//     }
// }

function Child() {
    const context = useContext(Context);
    return (
          <div>{context.name}</div>
        )
}

export default App
