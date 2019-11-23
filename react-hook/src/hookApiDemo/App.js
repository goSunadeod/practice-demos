import React, { Component, createRef, createContext } from 'react';

const Context = createContext('');

class Demo extends Component {
    constructor() {
        super();
        this.ref = createRef();
    }

    state = {
        text: '',
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.ref.current.style.color = 'red'
        }, 1000)
    }

    render() {
        return (
          <Context.Provider value="123">
              <input ref={this.ref}
                     type="text"
                     value={this.state.text}
                     onChange={this.handleChange}
              />
              <Child />
          </Context.Provider>
        )
    }

}


class Child extends Component {
    static contextType = Context;
    render() {
        return (
          <div>{this.context}</div>
        )
    }
}

export default Demo
