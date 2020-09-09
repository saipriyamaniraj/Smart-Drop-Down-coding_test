import { combineReducers } from 'redux-immutable';
import smartReducer from '../src/reduxFlow/smartReducer';

export default combineReducers({
    smart:smartReducer
});
