import React from 'react';
import Child from './Child';

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {age: 2}
    }

    componentDidMount() {
        console.log('father');
    }

    onchange = () => {
        this.setState(null) // 不会触发render
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
