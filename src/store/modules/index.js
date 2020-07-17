import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { connectRouter } from 'connected-react-router'

import basic from 'store/modules/basic';
import tracing from 'store/modules/tracing';

export default (history) => combineReducers({
    router: connectRouter(history),
    basic,
    tracing,
    pender: penderReducer, //pender 리듀서 추가
});