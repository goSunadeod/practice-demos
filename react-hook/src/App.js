import React, { useState, useRef, useEffect } from 'react';

export default function Example() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);
    useEffect(() => {
        document.title = `You clicked ${count} times`
    })
    return (
      <div>
          <p>You clicked {count} times</p>
          <p>Now: {count}, before: {prevCount}</p>
          <button onClick={() => setCount(count + 1)}>
              Click me
          </button>
      </div>
    )
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


// export default function Example() {
//     const [count, setCount] = useState(0);
//
//     function handleAlertClick() {
//         setTimeout(() => {
//             alert('You clicked on: ' + count);
//         }, 3000);
//     }
//
//     return (
//       <div>
//           <p>You clicked {count} times</p>
//           <button onClick={() => setCount(count + 1)}>
//               Click me
//           </button>
//           <button onClick={handleAlertClick}>
//               Show alert
//           </button>
//       </div>
//     );
// }



// const initialState = {count: 0};
//
// function reducer(state, action) {
//     switch (action.type) {
//         case 'increment':
//             return {count: state.count + 1};
//         case 'decrement':
//             return {count: state.count - 1};
//         default:
//             throw new Error();
//     }
// }
//
// export default function Counter() {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     return (
//       <React.Fragment>
//           Count: {state.count}
//           <button onClick={() => dispatch({type: 'increment'})}>+</button>
//           <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       </React.Fragment>
//     );
// }

//
// export default function TextInputWithFocusButton() {
//     const inputEl = useRef(null);
//     const onButtonClick = () => {
//         // `current` 指向已挂载到 DOM 上的文本输入元素
//         inputEl.current.focus();
//     };
//     return (
//       <React.Fragment>
//           <input ref={inputEl} type="text" />
//           <button onClick={onButtonClick}>Focus the input</button>
//       </React.Fragment>
//     );
// }