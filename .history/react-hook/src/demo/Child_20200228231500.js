import React from 'react';

export default class Child extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {child: '111'}
    }

    componentDidMount() {
        console.log('child');
    }


    render() {
        console.log('renderChild');
        return (
          <div>
              <h2>{this.state.child}</h2>
          </div>
        )
    }
}
