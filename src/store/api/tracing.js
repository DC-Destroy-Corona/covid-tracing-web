import axios from 'axios';
import { API_BASE_URL } from 'constants/index';

//전체 정보 조회
export const getGlobalInfo = (region, date, confpageIndex, cntctpageIndex) => {
    const baseURL = `${API_BASE_URL}/epid/login-success/covid-info/${region}/${date}/cntct/${confpageIndex}/conf/${cntctpageIndex}`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

//특정 접촉자 동선 조회
export const getContactorInfo = (cntctPatientId) => {
    const baseURL = `${API_BASE_URL}/epid/cntctPatient/${cntctPatientId}/movingInfo`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}

//특정 확진자 동선 조회
export const getConfirmerInfo = (confPatientId) => {
    const baseURL = `${API_BASE_URL}/epid/confPatient/${confPatientId}/movingInfo`

    return axios.get(baseURL)
    .then(res=> {
        console.log(res);
        return res;
    });
}