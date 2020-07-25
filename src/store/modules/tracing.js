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
const CH_LIST = "tracing/CH_LIST";
const CH_CLICK = "tracing/CH_CLICK";
const SELECT_PERSON = "tracing/SELECT_PERSON";
const GET_GLOBAL_INFO = "tracing/GET_GLOBAL_INFO";
const GET_CONTACTER_INFO = "tracing/GET_CONTACTER_INFO";
const GET_CONFIRMER_INFO = "tracing/GET_CONFIRMER_INFO";
const FILTER_REGION = 'tracing/FILTER_REGION';
const FILTER_DATE = 'tracing/FILTER_DATE';
const FILTER_CNTCT_INDEX = 'tracing/FILTER_CNTCT_INDEX'
const FILTER_CONF_INDEX = 'tracing/FILTER_CONF_INDEX'
const CLEAR_PERSON = 'tracing/CLEAR_PERSON'
const CLEAR_TARGET = 'tracing/CLEAR_TARGET'
const GET_TARGET_INFO = 'tracing/GET_TARGET_INFO'


/*--------create action--------*/
export const chCenter = createAction(CH_CENTER);
export const chLevel = createAction(CH_LEVEL);
export const chSelect = createAction(CH_SELECT);
export const chList = createAction(CH_LIST);
export const chClick = createAction(CH_CLICK);

export const selectPerson = createAction(SELECT_PERSON);
export const filterRegion = createAction(FILTER_REGION);
export const filterDate = createAction(FILTER_DATE);
export const filterCntctIndex = createAction(FILTER_CNTCT_INDEX);
export const filterConfIndex = createAction(FILTER_CONF_INDEX);
export const clearPerson = createAction(CLEAR_PERSON);
export const clearTarget = createAction(CLEAR_TARGET);
export const getTargetInfo = createAction(GET_TARGET_INFO, tracingApi.getTargetInfo);


export const getGlobalInfo = createAction(GET_GLOBAL_INFO, tracingApi.getGlobalInfo);
export const getContactorInfo = createAction(GET_CONTACTER_INFO, tracingApi.getContactorInfo);
export const getConfirmerInfo = createAction(GET_CONFIRMER_INFO, tracingApi.getConfirmerInfo);

/*--------state definition--------*/
const initialState = Map({
    pageSets: Map({
        select: null,
        isHide: false,
        clicked: false,
    }),
    filter:Map({
        region: 'kr',
        date:'0000-00-00',
        cntctPageIndex: 1,
        confPageIndex: 1,
        cntctPageIndexList: List([]),
        confPageIndexList: List([]),
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
            totalCntctPageIndex: 0,
            totalConfPageIndex: 0,
            regions:List([]),
            currentCntctPageIndex: 0,
            currentConfPageIndex: 0,
            date: '0000-00-00',
            selectRegion: 'kr',

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
    person: null,
    targetPerson: null
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

        [CH_CLICK]: (state, action) => {
            return state.setIn(["pageSets", "clicked"], action.payload);
        },

        [CH_LIST]: (state, action) => {
            return state.setIn(["pageSets", "isHide"], action.payload);
        },

        [SELECT_PERSON]: (state, action) => {
            return state.setIn(["pageSets", "select"], action.payload);
        },

        [FILTER_REGION]: (state, action) => {
            return state.setIn(["filter", "region"], action.payload);
        },

        [FILTER_DATE]: (state, action) => {
            return state.setIn(["filter", "date"], action.payload);
        },

        [FILTER_CNTCT_INDEX]: (state, action) => {
            return state.setIn(["filter", "cntctPageIndex"], action.payload);
        },

        [FILTER_CONF_INDEX]: (state, action) => {
            return state.setIn(["filter", "confPageIndex"], action.payload);
        },

        [CLEAR_PERSON]: (state, action) => {
            return state.set('person', null);
        },

        [CLEAR_TARGET]: (state, action) => {
            return state.set('targetPerson', null);
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
                            totalConfPageIndex: data.totalConfPageIndex,
                            totalCntctPageIndex: data.totalCntctPageIndex,
                            regions: Map(data.regions),
                            currentCntctPageIndex: data.currentCntctPageIndex,
                            currentConfPageIndex: data.currentConfPageIndex,
                            date: data.date,
                            selectRegion: data.selectRegion,

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
                                firstDateTime: item.firstDatetime,
                                lastDateTime: item.lastDatetime,
                                personNum: item.personNum,
                                contactorInfo: List(item.contactorInfo.map((elem)=>Map({id: elem.id})))
                            }))
                        ),
                        // cntctPatientInfo: List(data.cntctPatientInfo.map(item=>Map(item))),
                        // cntctPatientInfo: List(data.contactorInfo.map((item)=>Map({
                        //     //접촉자 아이디
                        //     userId: item.userId,
                        //     confPatientId: item.confPatientId,
                        //     cntctDatetime: item.confPatientId,
                        //     latitude: item.latitude, // y
                        //     longitude: item.longitude, // x
                        // }))),
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
                                firstDateTime: item.firstDatetime,
                                lastDateTime: item.lastDatetime,
                                personNum: item.personNum,
                                contactorInfo: List(item.contactorInfo.map((elem)=>Map({id: elem.id})))
                            }))
                        ),
                    }),
                );
            },
        }),

        //타겟 정보 조회
        ...pender({
            type: GET_TARGET_INFO,
            onSuccess: (state, action) => {
                const data = action.payload.data.data;

                return state.set(
                    "targetPerson",
                    Map({
                        type: data.type,
                        id: data.id,
                        movingInfo: List(
                            data.movingInfo.map((item)=>Map({
                                location: item.location,
                                latitude: item.latitude, // y
                                longitude: item.longitude, // x
                                firstDateTime: item.firstDatetime,
                                lastDateTime: item.lastDatetime,
                                personNum: item.personNum,
                                contactorInfo: item.contactorInfo.map((elem)=>Map({id: elem.id}))
                            }))
                        ),
                        // cntctPatientInfo: List(data.cntctPatientInfo.map(item=>Map(item))),
                        // cntctPatientInfo: List(data.contactorInfo.map((item)=>Map({
                        //     //접촉자 아이디
                        //     userId: item.userId,
                        //     confPatientId: item.confPatientId,
                        //     cntctDatetime: item.confPatientId,
                        //     latitude: item.latitude, // y
                        //     longitude: item.longitude, // x
                        // }))),
                    }),
                );
            },
        }),

    },
    initialState
);