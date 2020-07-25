import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

/*--------action type--------*/
const SB_SELECT = 'basic/SB_SELECT';
const SB_FOLD = 'basic/SB_FOLD';

/*--------create action--------*/
export const sbSelect = createAction(SB_SELECT);
export const sbFold = createAction(SB_FOLD);

/*--------state definition--------*/
const initialState = Map({
    basic: Map({
        select: 1,
        sidebarFold: false
    }),
});

/*--------reducer--------*/
export default handleActions({
    [SB_SELECT]: (state, action) => {
        return state.setIn(['basic', 'select'], action.payload);
    },

    [SB_FOLD]: (state, action) => {
        return state.setIn(['basic', 'sidebarFold'], action.payload);
    },
    
}, initialState);