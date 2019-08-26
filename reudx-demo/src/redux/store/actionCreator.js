import {INIT_DATA, CHANGE_VALUE, ADD_TODO_ITEM, GET_INIT_LIST} from './actionType';
import axios from 'axios';

export const changeValue = (value) => (
  {
      type: CHANGE_VALUE,
      value
  }
)

export const addItem = () => (
  {
      type: ADD_TODO_ITEM
  }
)

export const initData = (data) => (
  {
      type: INIT_DATA,
      data
  }
)

export const getTodo = () => {
    return (dispatch) => {
        //  可以通过charles 或者 easy-mock 进行代理
        axios.get('/api/todoList').then(res => {
            const data = res.data;
            const action = initData(data);
            dispatch(action)
        })
    }
}


export const getInitList = () => ({
    type: GET_INIT_LIST
})