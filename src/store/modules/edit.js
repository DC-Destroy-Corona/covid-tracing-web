import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as EditApi from 'store/api/edit';

/*--------action type--------*/
const INPUT_CONFIRMERID ='edit/INPUT_CONFIRMERID';
const SELECT_GENDER = 'edit/SELECT_GENDER';
const PICK_CONFIRM_DATETIME = 'edit/PICK_CONFIRM_DATETIME';
const REGISTER_CONFIRMER = 'edit/REGISTER_CONFIRMER';

/*--------create action--------*/
export const inputConfirmerid = createAction(INPUT_CONFIRMERID);
export const selectGender = createAction(SELECT_GENDER);
export const pickConfirmDatetime = createAction(PICK_CONFIRM_DATETIME);
export const registerConfirmer = createAction(REGISTER_CONFIRMER,EditApi.registerConfirmer);

/*--------state definition--------*/
const initialState = Map({
    confirmerInfo: Map({
        confirmerId: null,         
        gender: '',
        confirmDatetime:'',
    }),
    visitPointHistory: List([]),
    
    registerResult: null,
});

/*--------reducer--------*/
export default handleActions({
    [INPUT_CONFIRMERID]: (state, action) => {
    console.log("test " + action.payload);
    return state.setIn(['confirmerInfo', 'confirmerId'], action.payload);
    // return state.setIn(['edit', 'gender'], action.payload);
    },
    [SELECT_GENDER]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['confirmerInfo', 'gender'], action.payload);
        // return state.setIn(['edit', 'gender'], action.payload);
    },
    [PICK_CONFIRM_DATETIME]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['confirmerInfo', 'confirmDatetime'], action.payload);
        // return state.setIn(['edit', 'gender'], action.payload);
    },
    ...pender({
        type: REGISTER_CONFIRMER,
        onSuccess: (state, action) => {
            console.log("test registerResult" + action.payload.data);
            return state.set('registerResult', Map(
                action.payload.data
            ));
        },
    }),

}, initialState);