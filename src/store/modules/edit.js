import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as EditApi from 'store/api/edit';

/*--------action type--------*/
const INPUT_CONFIRMERID ='edit/INPUT_CONFIRMERID';
const SELECT_GENDER = 'edit/SELECT_GENDER';
const SELECT_REGION = 'edit/SELECT_REGION';
const PICK_CONFIRM_DATE = 'edit/PICK_CONFIRM_DATE';
const PICK_VISIT_DATETIME = 'edit/PICK_VISIT_DATETIME';
const REGISTER_CONFIRMER = 'edit/REGISTER_CONFIRMER';
const REGISTER_VISITPOINT = 'edit/REGISTER_VISITPOINT';
const SET_IS_MODAL_WITH_FALSE = 'edit/SET_IS_MODAL_WITH_FALSE';
const SET_IS_MODAL_WITH_TRUE = 'edit/SET_IS_MODAL_WITH_TRUE';

/*--------create action--------*/
export const inputConfirmerid = createAction(INPUT_CONFIRMERID);
export const selectGender = createAction(SELECT_GENDER);
export const selectRegion = createAction(SELECT_REGION);
export const pickConfirmDate = createAction(PICK_CONFIRM_DATE);
export const registerConfirmer = createAction(REGISTER_CONFIRMER,EditApi.registerConfirmer);
export const registerVisitPoint = createAction(REGISTER_VISITPOINT,EditApi.registerVisitPoint);
export const pickVisitDatetime = createAction(PICK_VISIT_DATETIME);
export const setIsModalWithFalse = createAction(SET_IS_MODAL_WITH_FALSE);
export const setIsModalWithTrue = createAction(SET_IS_MODAL_WITH_TRUE);

/*--------state definition--------*/
const initialState = Map({
    confirmerInfo: Map({
        confirmerId: null,         
        gender: '',
        region:'',
        confirmDate:'',
    }),
    visitPointInfo: Map({
        roadNameAddr: "",
        visitDatetime: null
    }),
    visitPointHistory: List([]),
    
    registerResult: null,

    showModal:false,
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
    },
    [SELECT_REGION]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['confirmerInfo', 'region'], action.payload);
    },
    [PICK_CONFIRM_DATE]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['confirmerInfo', 'confirmDate'], action.payload);
    },
    [SET_IS_MODAL_WITH_TRUE]: (state, action) => {
        console.log("showModal " + action.payload);
        return state.set('showModal', action.payload);
    },

    [SET_IS_MODAL_WITH_FALSE]: (state, action) => {
        console.log("showModal " + action.payload);
		return state.set('showModal', action.payload);
    },
    
    [PICK_VISIT_DATETIME]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['visitPointInfo', 'visitDatetime'], action.payload);
        // return state.setIn(['edit', 'gender'], action.payload);
    },

    ...pender({
        type: REGISTER_CONFIRMER,
        onSuccess: (state, action) => {
            console.log("test registerConfirmerResult" + action.payload.data);
            return state.set('registerConfirmerResult', Map(
                action.payload.data
            ));
        },
    }),
    
    ...pender({
        type: REGISTER_VISITPOINT,
        onSuccess: (state, action) => {
            console.log("test registerVisitPointResult" + action.payload.data);
            return state.set('registerVisitPointResult', Map(
                action.payload.data
            ));
        },
    }),

}, initialState);