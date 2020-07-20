import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

/*--------action type--------*/
const CH_CENTER = 'tracing/CH_CENTER';
const CH_LEVEL = 'tracing/CH_LEVEL';
const CH_SELECT = 'tracing/CH_SELECT';

/*--------create action--------*/
export const chCenter = createAction(CH_CENTER);
export const chLevel = createAction(CH_LEVEL);
export const chSelect = createAction(CH_SELECT);

/*--------state definition--------*/
const initialState = Map({
    pageSets: Map({
        select: null
    }),
    mapOption: Map({
        center: Map({
            latitude: 523951.25,
            longitude: 1085073.75
        }),
        level: 12
    }),
    person: Map({
        type: 2,
        id: null,
        movingInfo: List([
            Map({
                location: '경상북도 경산시 하양읍 13-13',
                latitude: 35.8525689,    // y
				longitude: 128.6443854,  // x
                firstDateTime: "2020-07-13 22:32:12",
                lastDateTime: "2020-07-13 22:32:12",
				cntctPatientNum: 4
            }),
            Map({
                location: '경상북도 경산시 하양읍 13-13',
                latitude: 35.839518,    // y
				longitude: 128.6926452,  // x
                firstDateTime: "2020-07-13 22:32:12",
                lastDateTime: "2020-07-13 22:32:12",
				cntctPatientNum: 4
            }),
            Map({
                location: '경상북도 경산시 하양읍 13-13',
                latitude: 35.834769,    // y
				longitude: 128.6968938,  // x
                firstDateTime: "2020-07-13 22:32:12",
                lastDateTime: "2020-07-13 22:32:12",
				cntctPatientNum: 4
            })
        ])
    })
});

/*--------reducer--------*/
export default handleActions({
    [CH_CENTER]: (state, action) => {
        return state.setIn(['mapOption', 'center'], Map(action.payload));
    },

    [CH_LEVEL]: (state, action) => {
        return state.setIn(['mapOption', 'level'], action.payload);
    },

    [CH_SELECT]: (state, action) => {
        return state.setIn(['pageSets', 'select'], action.payload);
    },
    
}, initialState);