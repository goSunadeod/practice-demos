import {CHANGE_VALUE, ADD_TODO_ITEM, INIT_DATA} from './actionType'

const defaultState = {
    inputValue: '',
    list: []
}
export default (state = defaultState, action) => {
    if (action.type === CHANGE_VALUE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if (action.type === INIT_DATA) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = action.data;
        return newState;
    }
    return state;
}