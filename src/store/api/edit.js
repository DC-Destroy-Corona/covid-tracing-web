import axios from 'axios';
import ip from 'ip';
import { 
    API_BASE_URL
} from '../../constants';

export const registerConfirmer = (confirmerInfo) => {
    const baseURL = `${API_BASE_URL}/confirmer`
    return axios
        .post(baseURL, confirmerInfo) //get 방식이면 get으로 변경 필요
        .then(res => {
            console.log(res);
            return res;
        });
} // confirmerInfo 부분 수정 필요..?

export const registerVisitPoint = (visitPointInfo) => {
    const baseURL = `${API_BASE_URL}/visitPoint`
    return axios
        .post(baseURL, visitPointInfo) //get 방식이면 get으로 변경 필요
        .then(res => {
            console.log(res);
            return res;
        });
} // visitPointInfo 부분 수정 필요..?