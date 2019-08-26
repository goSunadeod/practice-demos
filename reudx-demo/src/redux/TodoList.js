import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Input, Button, List} from 'antd';
import {getInitList, changeValue, addItem} from './store/actionCreator'
import store from './store'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange)
    }

    render() {
        return (
          <div>
              <div>
                  <Input value={this.state.inputValue} placeholder="todo info"
                         style={{width: 300, marginRight: '10px'}}
                         onChange={this.handleChange}
                  />
                  <Button type="primary" onClick={this.handleButtonClick}>提交</Button>
              </div>
              <List
                style={{marginTop: '10px', width: '300px'}}
                bordered
                dataSource={this.state.list}
                renderItem={item => (<List.Item>{item}</List.Item>)}>
              </List>
          </div>
        )
    }
    componentDidMount() {
        const action = getInitList();
        store.dispatch(action);
    }

    handleChange(e) {
        const action = changeValue(e.target.value);
        store.dispatch(action);
    }
    handleButtonClick() {
        const action = addItem();
        store.dispatch(action);
    }
    handleStoreChange() {
        this.setState(store.getState());
    }
}

export default TodoList