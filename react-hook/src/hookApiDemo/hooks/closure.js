import React, {useState, useRef} from 'react'

//闭包陷阱
export default function ClosureDemo() {
    const [count, setCount] = useState(0)

    const countRef = useRef();
    countRef.current = count

    const handleAdd = () => {
        setCount(count + 1)
    }

    // 点三下add 点一下alert 点两下add
    const handleAlert = () => {
        setTimeout(
          () => {
              // alert(count) // 弹出3
              alert(countRef.current) // 弹出5
          }, 2000
        )
    }

    return (
      <>
          <p>{count}</p>
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleAlert}>Alert</button>
      </>
    )
}


// export default class Counter extends React.Component {
//     state = {
//         count: 0
//     }
//     handleAdd =() => {
//         this.setState({
//             count: this.state.count + 1
//         })
//     }
//
//     handleAlert = () => {
//
//         const count = this.state.count
//         setTimeout(
//           () => {
//               // alert(this.state.count)
//               alert(count)
//           }, 2000
//         )
//     }
//     render() {
//         return (
//           <>
//               <p>{this.state.count}</p>
//               <button onClick={this.handleAdd}>Add</button>
//               <button onClick={this.handleAlert}>Alert</button>
//           </>
//         )
//     }
// }
