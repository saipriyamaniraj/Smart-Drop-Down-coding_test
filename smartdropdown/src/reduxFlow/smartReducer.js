import { combineReducers } from 'redux-immutable';
import Immutable, { List as immutableList, Map as immutableMap } from 'immutable';
import * as ActionTypes from './smartTypes';

function getCountryNames(state = immutableList(), action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_COUNTRY_NAME_LOAD:
      return Immutable.fromJS(action.data.countries);
    default:
      return state;
  }
}

function addCountryNames(state = immutableMap(), action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_ADD_COUNTRY_NAME:
      return Immutable.fromJS(action.data);
    default:
      return state;
  }
}

export default combineReducers({
  getCountryNames,
  addCountryNames
});
