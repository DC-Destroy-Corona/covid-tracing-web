import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

/*--------action type--------*/
const SB_SELECT = 'basic/SB_SELECT';

/*--------create action--------*/
export const sbSelect = createAction(SB_SELECT);

/*--------state definition--------*/
const initialState = Map({
    basic: Map({
        select: 1
    }),
});

/*--------reducer--------*/
export default handleActions({
    [SB_SELECT]: (state, action) => {
        return state.setIn(['basic', 'select'], action.payload);
    },
    
}, initialState);