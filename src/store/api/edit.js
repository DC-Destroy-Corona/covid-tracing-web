import axios from 'axios';
import ip from 'ip';
import {
    API_BASE_URL
} from '../../constants';

export const getConfPatientAndBeaconList = (confPageIndex, beaconPageIndex) => {
    const baseURL = `${API_BASE_URL}/epid/login-success/covid-info/edit/conf/${confPageIndex}/beacon/${beaconPageIndex}`;

    console.info("getConfPatientAndBeaconList");
    return axios.get(baseURL).then(res => {
        console.error(`log ==> api call getConfPatientAndBeaconList`);
        console.error(res);
        return res;
    })
}

export const registerConfirmer = (confirmerInfo) => {
    const baseURL = `${API_BASE_URL}/epid/record/confPatient/${confirmerInfo.confPatient.confPatientId}/movingInfoList`
    return axios
        .post(baseURL, confirmerInfo) //get 방식이면 get으로 변경 필요
        .then(res => {
            console.log(res);
            return res;
        });
    // return axios
    //     .post(baseURL, confirmerInfo) //get 방식이면 get으로 변경 필요
    //     .then(res => {
    //         console.log(res);
    //         return res;
    //     });
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

    const sendData = {
        uuid: BeaconInfo.get('beaconUuid'),
        major: BeaconInfo.get('beaconMajor'),
        minor: BeaconInfo.get('beaconMinor'),
        latitude: BeaconInfo.get('latitude'),
        longitude: BeaconInfo.get('longitude'),
        streetNameAddr: BeaconInfo.get('beaconStreetNameAddr'),
        streetNameAddrDesc: BeaconInfo.get('beaconStreetNameAddrDES')
    }
    // const baseURL = `${API_BASE_URL}/visitPoint`
    const baseURL = `${API_BASE_URL}/epid/beacon
    `
    return axios
        .post(baseURL, sendData) //get 방식이면 get으로 변경 필요
        .then(res => {
            console.log(res);
            return res;
        });
} // visitPointInfo 부분 수정 필요..?