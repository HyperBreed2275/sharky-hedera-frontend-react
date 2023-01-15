import axios from 'axios';
import { SEND_OFFER_PREFIX, SERVER_URL } from '../default/url';

export const getRequest = async (url) => {
    try {
        const res = await axios.get(url);
        // console.log('getRequest log - 1 : ', res.data);
        return { result: true, data: res.data };
    } catch (error) {
        // console.error('getRequest log - 2 : ', { result: false, error: error });
        return { result: false, error: error.message };
    }
}

export const postRequest = async (url, data) => {
    try {
        const res = await axios.post(url, data);
        // console.log('getRequest log - 1 : ', res.data);
        return { result: true, data: res.data };
    } catch (error) {
        // console.error('getRequest log - 2 : ', { result: false, error: error });
        return { result: false, error: error.message };
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sendCreateLoanRequest = async (accountId_s, tokenId_s, serialNum_s, duration_s, billPrice_s) => {
    console.log('sendCreateLoanRequest log - 1 : ', accountId_s, tokenId_s, serialNum_s, duration_s, billPrice_s);
    try {
        const sendOfferResult = await postRequest(SERVER_URL + SEND_OFFER_PREFIX, {
            accountId: btoa(accountId_s),
            tokenId: btoa(tokenId_s),
            serialNum: btoa(serialNum_s),
            duration: btoa(duration_s),
            billPrice: btoa(billPrice_s),
        });

        return sendOfferResult.data;
    } catch (error) {
        return { result: false, error: error.message };
    }
}