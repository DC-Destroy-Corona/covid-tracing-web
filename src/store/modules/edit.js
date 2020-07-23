import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as EditApi from 'store/api/edit';


/*--------action type--------*/
const INPUT_ROADNAMEADDR = 'edit/INPUT_ROADNAMEADDR';
const INPUT_CONFPATIENTID ='edit/INPUT_CONFPATIENTID';
const SELECT_GENDER = 'edit/SELECT_GENDER';
const SELECT_REGION = 'edit/SELECT_REGION';
const PICK_CONFDATETIME = 'edit/PICK_CONFDATETIME';
const PICK_VISIT_DATETIME = 'edit/PICK_VISIT_DATETIME';
const REGISTER_CONFIRMER = 'edit/REGISTER_CONFIRMER';
const REGISTER_VISITPOINT = 'edit/REGISTER_VISITPOINT';
const SET_IS_MODAL_WITH_FALSE = 'edit/SET_IS_MODAL_WITH_FALSE';
const SET_IS_MODAL_WITH_TRUE = 'edit/SET_IS_MODAL_WITH_TRUE';

const INPUT_LATITUDE = 'edit/INPUT_LATITUDE';
const INPUT_LONGITUDE = 'edit/INPUT_LONGITUDE';
const INPUT_TYPE = 'edit/INPUT_TYPE';
const INPUT_PROVINCE = 'edit/INPUT_PROVINCE';

const CONFIRMER_REG_INPUT_CLEAR = 'edit/CONFIRMER_REG_INPUT_CLEAR';
const VISITPOINT_REG_INPUT_CLEAR = 'edit/VISITPOINT_REG_INPUT_CLEAR';
/*--------create action--------*/
export const inputRoadNameAddr = createAction(INPUT_ROADNAMEADDR);
export const inputConfPatientId = createAction(INPUT_CONFPATIENTID);
export const selectGender = createAction(SELECT_GENDER);
export const selectRegion = createAction(SELECT_REGION);
export const pickConfDateTime = createAction(PICK_CONFDATETIME);

export const inputLatitude = createAction(INPUT_LATITUDE);
export const inputLongitude = createAction(INPUT_LONGITUDE);
export const inputType = createAction(INPUT_TYPE);
export const inputProvince = createAction(INPUT_PROVINCE);

export const registerConfirmer = createAction(REGISTER_CONFIRMER,EditApi.registerConfirmer);
export const registerVisitPoint = createAction(REGISTER_VISITPOINT,EditApi.registerVisitPoint);
export const pickVisitDatetime = createAction(PICK_VISIT_DATETIME);
export const setIsModalWithFalse = createAction(SET_IS_MODAL_WITH_FALSE);
export const setIsModalWithTrue = createAction(SET_IS_MODAL_WITH_TRUE);

export const confirmerRegInputClear  = createAction(CONFIRMER_REG_INPUT_CLEAR);
export const visitPointRegInputClear  = createAction(VISITPOINT_REG_INPUT_CLEAR);

/*--------state definition--------*/
const initialState = Map({
    confirmerInfo: Map({
        confPatientId: '',         
        gender: '',
        region:'',
        confDatetime:'',
    }),
    
    visitPointInfo: Map({
        roadNameAddr: '',
        visitDatetime: '',
        latitude:'',
        longitude:'',
        type:'',
        province :''
    }),

    // ConfirmerInfoList :List([]),
    visitPointHistory: List([]),
    
    registerResult: null,

    showModal:false,
});

/*--------reducer--------*/
export default handleActions({
    
    [INPUT_CONFPATIENTID]: (state, action) => {
    console.log("test " + action.payload);
    return state.setIn(['confirmerInfo', 'confPatientId'], action.payload);
    },
    [SELECT_GENDER]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['confirmerInfo', 'gender'], action.payload);
    },
    [SELECT_REGION]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['confirmerInfo', 'region'], action.payload);
    },
    [PICK_CONFDATETIME]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['confirmerInfo', 'confDatetime'], action.payload);
    },
    [SET_IS_MODAL_WITH_TRUE]: (state, action) => {
        console.log("showModal " + action.payload);
        return state.set('showModal', action.payload);
    },

    [SET_IS_MODAL_WITH_FALSE]: (state, action) => {
        console.log("showModal " + action.payload);
		return state.set('showModal', action.payload);
    },
    [INPUT_ROADNAMEADDR]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['visitPointInfo', 'roadNameAddr'], action.payload);
    },
    [PICK_VISIT_DATETIME]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['visitPointInfo', 'visitDatetime'], action.payload);
    },
    [INPUT_LATITUDE]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['visitPointInfo', 'latitude'], action.payload);
    },
    [INPUT_LONGITUDE]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['visitPointInfo', 'longitude'], action.payload);
    },
    [INPUT_TYPE]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['visitPointInfo', 'type'], action.payload);
    },
    [INPUT_PROVINCE]: (state, action) => {
        console.log("test " + action.payload);
        return state.setIn(['visitPointInfo', 'province'], action.payload);
    },
    [CONFIRMER_REG_INPUT_CLEAR]: (state, action) => {
        return state.set('confirmerInfo', Map({
                confPatientId: '',         
                gender: '',
                region:'',
                confDatetime:'',
            }));
    },
    [VISITPOINT_REG_INPUT_CLEAR]: (state, action) => {
        return state.set('visitPointInfo', Map({
            roadNameAddr: '',
            visitDatetime: '',
            latitude:'',
            longitude:'',
            type:'',
            province :''
        }));
    },

    ...pender({
        type: REGISTER_CONFIRMER,
        onSuccess: (state, action) => {
            console.log("test registerConfirmerResult" + action.payload.data);
            return state.set('registerConfPatient', Map(
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