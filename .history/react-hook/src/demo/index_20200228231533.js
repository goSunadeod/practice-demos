import React from 'react';
import Child from './Child';

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {age: 2}
    }

    componentDidMount() {
        console.log('father');
    }

    onchange = () => {
        // this.setState(null) // 不会触发render
        this.setState({age: 4})
    }

    render() {
        console.log('renderFather');
        return (
          <div>
              <h2>{this.state.age}</h2>
              <button onClick={this.onchange}>测试</button>
              <Child></Child>
          </div>
        )
    }
}
