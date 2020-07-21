import axios from 'axios';
import ip from 'ip';
import { 
    API_BASE_URL
} from '../../constants';

export const registerConfirmer = (confirmerInfo) => {
    const baseURL = `${API_BASE_URL}/confirmer`
    return axios
        .post(baseURL, confirmerInfo)
        .then(res => {
            console.log(res);
            return res;
        });
} // confirmerInfo 부분 수정 필요..?