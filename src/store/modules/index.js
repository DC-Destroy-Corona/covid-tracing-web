import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { connectRouter } from 'connected-react-router'

import basic from 'store/modules/basic';
import tracing from 'store/modules/tracing';
import edit from 'store/modules/edit';

export default (history) => combineReducers({
    router: connectRouter(history),
    basic,
    tracing,
    edit,
    pender: penderReducer, //pender 리듀서 추가
});