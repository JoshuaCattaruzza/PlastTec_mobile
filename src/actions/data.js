import { FETCH_DATA, FETCH_DATA_PENDING } from './types';
import Dataservice from '../services/data.service';
export const getData = (id) => (dispatch) => {
    return Dataservice.getData(id).then((res)=>{
        dispatch({
            type: FETCH_DATA,
            payload: res,
        });
        return Promise.resolve();
    }
    )
};
export const getDataPending = (id) => (dispatch) => {
    return Dataservice.getDataPending(id).then((res)=>{
        dispatch({
            type: FETCH_DATA_PENDING,
            payload: res,
        });
        return Promise.resolve();
    }
    )
};
