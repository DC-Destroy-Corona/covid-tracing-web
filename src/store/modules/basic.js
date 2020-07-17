import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

/*--------action type--------*/
const SB_TOGGLE = 'basic/SB_TOGGLE';

/*--------create action--------*/
export const sbToggle = createAction(SB_TOGGLE);

/*--------state definition--------*/
const initialState = Map({
    
});

/*--------reducer--------*/
export default handleActions({
    
    
}, initialState);