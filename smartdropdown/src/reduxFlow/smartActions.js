import * as ActionTypes from './smartTypes';
import { getRequest } from '../common/restAxiosApi';


export const getCountryNames = async (dispatch) => {
	dispatch({ type: ActionTypes.REQUEST_COUNTRY_NAME_LOAD});
	const responseData = await getRequest('/countries');
	await dispatch({ type: ActionTypes.RECEIVE_COUNTRY_NAME_LOAD, data : responseData.data });
};

export const addCountryNames = async (dispatch,country) => {
	dispatch({ type: ActionTypes.REQUEST_ADD_COUNTRY_NAME});
	const responseData = await getRequest(`/addcountry?name=${country}`);
	await dispatch({ type: ActionTypes.RECEIVE_ADD_COUNTRY_NAME, data : responseData.data });
	return responseData;
};