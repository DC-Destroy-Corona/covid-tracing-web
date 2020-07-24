import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as EditApi from 'store/api/edit';


/*--------action type--------*/
const INPUT_CONFPATIENTID = 'edit/INPUT_CONFPATIENTID';
const SELECT_GENDER = 'edit/SELECT_GENDER';
const SELECT_REGION = 'edit/SELECT_REGION';
const PICK_CONFDATETIME = 'edit/PICK_CONFDATETIME';

const INPUT_STREETNAMEADDR = 'edit/INPUT_STREETNAMEADDR';
const INPUT_LATITUDE = 'edit/INPUT_LATITUDE';
const INPUT_LONGITUDE = 'edit/INPUT_LONGITUDE';
const PICK_FIRST_DATETIME = 'edit/PICK_FIRST_DATETIME';
const INPUT_TYPE = 'edit/INPUT_TYPE';
const INPUT_PROVINCE = 'edit/INPUT_PROVINCE';

const INPUT_BEACON_UUID = 'edit/INPUT_BEACON_UUID';
const INPUT_BEACON_MAJOR = 'edit/INPUT_BEACON_MAJOR';
const INPUT_BEACON_MINOR = 'edit/INPUT_BEACON_MINOR';
const INPUT_BEACON_STREETNAMEADDR = 'edit/INPUT_BEACON_STREETNAMEADDR';
const INPUT_BEACON_STREETNAMEADDR_DES = 'edit/INPUT_BEACON_STREETNAMEADDR_DES';

const REGISTER_CONFIRMER = 'edit/REGISTER_CONFIRMER';
const REGISTER_VISITPOINT = 'edit/REGISTER_VISITPOINT';
const REGISTER_BEACON = 'edit/REGISTER_BEACON';

const SET_IS_MODAL_WITH_FALSE = 'edit/SET_IS_MODAL_WITH_FALSE';
const SET_IS_MODAL_WITH_TRUE = 'edit/SET_IS_MODAL_WITH_TRUE';

const CONFIRMER_REG_INPUT_CLEAR = 'edit/CONFIRMER_REG_INPUT_CLEAR';
const VISITPOINT_REG_INPUT_CLEAR = 'edit/VISITPOINT_REG_INPUT_CLEAR';
const BEACON_REG_INPUT_CLEAR = 'edit/BEACON_REG_INPUT_CLEAR';

const GET_CONF_PATIENT_AND_BEACON_LIST = 'edit/GET_CONF_PATIENT_AND_BEACON_LIST';

/*--------create action--------*/
export const inputConfPatientId = createAction(INPUT_CONFPATIENTID);
export const selectGender = createAction(SELECT_GENDER);
export const selectRegion = createAction(SELECT_REGION);
export const pickConfDateTime = createAction(PICK_CONFDATETIME);

export const inputStreetNameAddr = createAction(INPUT_STREETNAMEADDR);
export const inputLatitude = createAction(INPUT_LATITUDE);
export const inputLongitude = createAction(INPUT_LONGITUDE);
export const pickFirstDatetime = createAction(PICK_FIRST_DATETIME);
export const inputType = createAction(INPUT_TYPE);
export const inputProvince = createAction(INPUT_PROVINCE);

export const inputBeaconUuid = createAction(INPUT_BEACON_UUID);
export const inputBeaconMajor = createAction(INPUT_BEACON_MAJOR);
export const inputBeaconMinor = createAction(INPUT_BEACON_MINOR);
export const inputBeaconStreetNameAddr = createAction(INPUT_BEACON_STREETNAMEADDR);
export const inputBeaconStreetNameAddrDES = createAction(INPUT_BEACON_STREETNAMEADDR_DES);

export const registerConfirmer = createAction(REGISTER_CONFIRMER, EditApi.registerConfirmer);
export const registerVisitPoint = createAction(REGISTER_VISITPOINT, EditApi.registerVisitPoint);
export const registerBeacon = createAction(REGISTER_BEACON, EditApi.registerBeacon);

export const setIsModalWithFalse = createAction(SET_IS_MODAL_WITH_FALSE);
export const setIsModalWithTrue = createAction(SET_IS_MODAL_WITH_TRUE);

export const confirmerRegInputClear = createAction(CONFIRMER_REG_INPUT_CLEAR);
export const visitPointRegInputClear = createAction(VISITPOINT_REG_INPUT_CLEAR);
export const beaconRegInputClear = createAction(BEACON_REG_INPUT_CLEAR);

export const getConfPatientAndBeaconList = createAction(GET_CONF_PATIENT_AND_BEACON_LIST, EditApi.getConfPatientAndBeaconList);

/*--------state definition--------*/
const initialState = Map({

    globalInfo: Map({
        beaconList: List([]),
        confPatientList: List([]),
        currentBeaconPageIndex: 0,
        currentConfPageIndex: 0,
        totalBeacon: 0,
        totalBeaconPageIndex: 0,
        totalConfPageIndex: 0,
        totalConfPatient: 0,
    }),

    confirmerInfo: Map({
        confPatientId: '',
        gender: '',
        region: '',
        confDatetime: '',
    }),

    visitPointInfo: Map({
        streetNameAddr: '',
        firstDatetime: '',
        latitude: '',
        longitude: '',
        type: '',
        province: ''
    }),

    // ConfirmerInfoList: List([]),
    // visitPointHistory: List([]),

    beaconInfo: Map({
        beaconUuid: '',
        beaconMajor: '',
        beaconMinor: '',
        beaconStreetNameAddr: '',
        beaconStreetNameAddrDES: ''
    }),

    registerResult: null,

    showModal: false,
});

/*--------reducer--------*/
export default handleActions({

    [INPUT_CONFPATIENTID]: (state, action) => {
        return state.setIn(['confirmerInfo', 'confPatientId'], action.payload);
    },
    [SELECT_GENDER]: (state, action) => {
        return state.setIn(['confirmerInfo', 'gender'], action.payload);
    },
    [SELECT_REGION]: (state, action) => {
        return state.setIn(['confirmerInfo', 'region'], action.payload);
    },
    [PICK_CONFDATETIME]: (state, action) => {
        return state.setIn(['confirmerInfo', 'confDatetime'], action.payload);
    },
    [SET_IS_MODAL_WITH_TRUE]: (state, action) => {
        return state.set('showModal', action.payload);
    },

    [SET_IS_MODAL_WITH_FALSE]: (state, action) => {
        return state.set('showModal', action.payload);
    },
    [INPUT_STREETNAMEADDR]: (state, action) => {
        return state.setIn(['visitPointInfo', 'streetNameAddr'], action.payload);
    },
    [PICK_FIRST_DATETIME]: (state, action) => {
        return state.setIn(['visitPointInfo', 'firstDateTime'], action.payload);
    },
    [INPUT_LATITUDE]: (state, action) => {
        return state.setIn(['visitPointInfo', 'latitude'], action.payload);
    },
    [INPUT_LONGITUDE]: (state, action) => {
        return state.setIn(['visitPointInfo', 'longitude'], action.payload);
    },
    [INPUT_TYPE]: (state, action) => {
        return state.setIn(['visitPointInfo', 'type'], action.payload);
    },
    [INPUT_PROVINCE]: (state, action) => {
        return state.setIn(['visitPointInfo', 'province'], action.payload);
    },
    [INPUT_BEACON_UUID]: (state, action) => {
        return state.setIn(['beaconInfo', 'beaconUuid'], action.payload);
    },
    [INPUT_BEACON_MAJOR]: (state, action) => {
        return state.setIn(['beaconInfo', 'beaconMajor'], action.payload);
    },
    [INPUT_BEACON_MINOR]: (state, action) => {
        return state.setIn(['beaconInfo', 'beaconMinor'], action.payload);
    },
    [INPUT_BEACON_STREETNAMEADDR]: (state, action) => {
        return state.setIn(['beaconInfo', 'beaconStreetNameAddr'], action.payload);
    },
    [INPUT_BEACON_STREETNAMEADDR_DES]: (state, action) => {
        return state.setIn(['beaconInfo', 'beaconStreetNameAddrDES'], action.payload);
    },
    [CONFIRMER_REG_INPUT_CLEAR]: (state, action) => {
        return state.set('confirmerInfo', Map({
            confPatientId: '',
            gender: '',
            region: '',
            confDatetime: '',
        }));
    },
    [VISITPOINT_REG_INPUT_CLEAR]: (state, action) => {
        return state.set('visitPointInfo', Map({
            streetNameAddr: '',
            firstDatetime: '',
            latitude: '',
            longitude: '',
            type: '',
            province: ''
        }));
    },
    [BEACON_REG_INPUT_CLEAR]: (state, action) => {
        return state.set('beaconInfo', Map({
            beaconUuid: '',
            beaconMajor: '',
            beaconMinor: '',
            beaconStreetNameAddr: '',
            beaconStreetNameAddrDES: ''
        }));
    },




    ...pender({
        type: GET_CONF_PATIENT_AND_BEACON_LIST,
        onSuccess: (state, action) => {
            console.error("onSuccess ==> GET_CONF_PATIENT_AND_BEACON_LIST");
            const data = action.payload.data.data;
            return state.set('globalInfo', Map({
                beaconList: List(data.beaconList),
                confPatientList: List(data.confPatientList),
                currentBeaconPageIndex: data.currentBeaconPageIndex,
                currentConfPageIndex: data.currentConfPageIndex,
                totalBeacon: data.totalBeacon,
                totalBeaconPageIndex: data.totalBeaconPageIndex,
                totalConfPageIndex: data.totalConfPageIndex,
                totalConfPatient: data.totalConfPatient,
            }));
        },
    }),
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
    ...pender({
        type: REGISTER_BEACON,
        onSuccess: (state, action) => {
            console.log("test registerVisitPointResult" + action.payload.data);
            return state.set('registerBeaconResult', Map(
                action.payload.data
            ));
        },
    }),

}, initialState);