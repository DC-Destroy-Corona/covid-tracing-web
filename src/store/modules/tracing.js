import {
    createAction,
    handleActions
} from "redux-actions";
import {
    Map,
    List
} from "immutable";
import {
    pender
} from "redux-pender";
import * as tracingApi from 'store/api/tracing';

/*--------action type--------*/
const CH_CENTER = "tracing/CH_CENTER";
const CH_LEVEL = "tracing/CH_LEVEL";
const CH_SELECT = "tracing/CH_SELECT";
const SELECT_PERSON = "tracing/SELECT_PERSON";
const GET_GLOBAL_INFO = "tracing/GET_GLOBAL_INFO";
const GET_CONTACTER_INFO = "tracing/GET_CONTACTER_INFO";
const GET_CONFIRMER_INFO = "tracing/GET_CONFIRMER_INFO";

/*--------create action--------*/
export const chCenter = createAction(CH_CENTER);
export const chLevel = createAction(CH_LEVEL);
export const chSelect = createAction(CH_SELECT);
export const selectPerson = createAction(SELECT_PERSON);

export const getGlobalInfo = createAction(GET_GLOBAL_INFO, tracingApi.getGlobalInfo);
export const getContactorInfo = createAction(GET_CONTACTER_INFO, tracingApi.getContactorInfo);
export const getConfirmerInfo = createAction(GET_CONFIRMER_INFO, tracingApi.getConfirmerInfo);

/*--------state definition--------*/
const initialState = Map({
    pageSets: Map({
        select: null,
    }),
    mapOption: Map({
        center: Map({
            latitude: 523951.25,
            longitude: 1085073.75,
        }),
        level: 12,
    }),
    globalInfo: Map({
        info: Map({
            totalConfPatient: 0,
            totalCntctPatient: 0,

            //확진자 리스트
            confPatientList: List([]),

            //접촉자 리스트
            cntctPatientList: List([
                // Map({
                //     cntctPatientId: 3,
                //     gender: "woman",
                //     confPatientId: 12,
                //     visitPointNum: 3,
                // }),
            ]),
        }),
    }),
    person: null
    // Map({
    //     type: 2,
    //     id: 12590,
    //     movingInfo: List([
    //         Map({
    //             location: "경상북도 경산시 하양읍 13-13",
    //             latitude: 35.8525689, // y
    //             longitude: 128.6443854, // x
    //             firstDateTime: "2020-07-13 22:32:12",
    //             lastDateTime: "2020-07-13 22:32:12",
    //             cntctPatientNum: 4,
    //         }),
    //         Map({
    //             location: "경상북도 경산시 하양읍 13-13",
    //             latitude: 35.839518, // y
    //             longitude: 128.6926452, // x
    //             firstDateTime: "2020-07-13 22:32:12",
    //             lastDateTime: "2020-07-13 22:32:12",
    //             cntctPatientNum: 4,
    //         }),
    //         Map({
    //             location: "경상북도 경산시 하양읍 13-13",
    //             latitude: 35.834769, // y
    //             longitude: 128.6968938, // x
    //             firstDateTime: "2020-07-13 22:32:12",
    //             lastDateTime: "2020-07-13 22:32:12",
    //             cntctPatientNum: 4,
    //         }),
    //     ]),
    // })
    ,
});

/*--------reducer--------*/
export default handleActions({
        /*------------Related inner functions-------------*/
        [CH_CENTER]: (state, action) => {
            return state.setIn(["mapOption", "center"], Map(action.payload));
        },

        [CH_LEVEL]: (state, action) => {
            return state.setIn(["mapOption", "level"], action.payload);
        },

        [CH_SELECT]: (state, action) => {
            return state.setIn(["pageSets", "select"], action.payload);
        },

        [SELECT_PERSON]: (state, action) => {
            return state.setIn(["pageSets", "select"], action.payload);
        },

        /*------------Related API-------------*/

        //전체 데이터 조회
        ...pender({
            type: GET_GLOBAL_INFO,
            onSuccess: (state, action) => {
                const data = action.payload.data.data;

                return state.set(
                    "globalInfo",
                    Map({
                        info: Map({
                            totalConfPatient: data.totalConfPatient,
                            totalCntctPatient: data.totalCntctPatient,

                            //확진자 리스트
                            confPatientList: List(
                                data.confPatientList.map((item)=>Map({
                                    confPatientId: item.confPatientId,
                                    cntctPatientId: item.cntctPatientId,
                                    gender: item.gender,
                                    cntctPatientNum: item.cntctPatientNum,
                                    visitPointNum: item.visitPointNum,
                                    confDatetime: item.confDatetime,
                                    contactorNum: item.contactorNum
                                }))
                            ),

                            //접촉자 리스트
                            cntctPatientList: List(
                                data.cntctPatientList.map((item)=>Map({
                                    confPatientId: item.confPatientId,
                                    cntctPatientId: item.cntctPatientId,
                                    email: item.email,
                                    phone: item.phone,
                                    gender: item.gender,
                                    cntctPatientNum: item.cntctPatientNum,
                                    visitPointNum: item.visitPointNum,
                                }))
                            ),
                        }),
                    })
                );
            },
        }),

        //특정 확진자 정보 조회
        ...pender({
            type: GET_CONFIRMER_INFO,
            onSuccess: (state, action) => {
                const data = action.payload.data.data;

                return state.set(
                    "person",
                    Map({
                        type: data.type,
                        id: data.id,
                        movingInfo: List(
                            data.movingInfo.map((item)=>Map({
                                location: item.location,
                                latitude: item.latitude, // y
                                longitude: item.longitude, // x
                                datetime: item.datetime,
                                cntctPatientNum: item.cntctPatientNum,
                            }))
                        ),
                    }),
                );
            },
        }),

        //특정 접촉자 정보 조회
        ...pender({
            type: GET_CONTACTER_INFO,
            onSuccess: (state, action) => {
                const data = action.payload.data.data;

                return state.set(
                    "person",
                    Map({
                        type: data.type,
                        id: data.id,
                        movingInfo: List(
                            data.movingInfo.map((item)=>Map({
                                location: item.location,
                                latitude: item.latitude, // y
                                longitude: item.longitude, // x
                                firstDateTime: item.firstDateTime,
                                lastDateTime: item.lastDateTime,
                                cntctPatientNum: item.cntctPatientNum,
                            }))
                        ),
                    }),
                );
            },
        }),
    },
    initialState
);