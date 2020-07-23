import axios from 'axios';
import ip from 'ip';
import { 
    API_BASE_URL
} from '../../constants';

export const registerConfirmer = (confirmerInfo) => {
    const baseURL = `${API_BASE_URL}/epid/record/confPatient`
    return axios
        .post(baseURL, confirmerInfo) //get 방식이면 get으로 변경 필요
        .then(res => {
            console.log(res);
            return res;
        });
} // confirmerInfo 부분 수정 필요..?

export const registerVisitPoint = (confPatientId) => {
    // const baseURL = `${API_BASE_URL}/visitPoint`
    const baseURL = `${API_BASE_URL}/epid/record/confPatient/${confPatientId}/movingInfoList`
    return axios
        .post(baseURL) //get 방식이면 get으로 변경 필요
        .then(res => {
            console.log(res);
            return res;
        });
} // visitPointInfo 부분 수정 필요..?

export const registerBeacon = (BeaconInfo) => {
    // const baseURL = `${API_BASE_URL}/visitPoint`
    const baseURL = `${API_BASE_URL}/`
    return axios
        .post(baseURL, BeaconInfo) //get 방식이면 get으로 변경 필요
        .then(res => {
            console.log(res);
            return res;
        });
} // visitPointInfo 부분 수정 필요..?