import { takeEvery, put } from 'redux-saga/effects';
import {GET_INIT_LIST} from './actionType';
import {initData} from './actionCreator';
import axios from 'axios';

function* getInitList() {
    try {
        const res = yield axios.get('/api/todoList');
        const action = initData(res.data);
        yield put(action);
    } catch(e) {
        console.log(e, 'error');
    }
}

function* mySaga() {
    yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;