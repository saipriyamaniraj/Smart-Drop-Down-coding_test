import React from 'react';
import ReactDOM from 'react-dom';
import CountryDisplay from './components/countryDisplay';
import { Provider } from "react-redux";
import { createStore } from "redux";
import MainReducer from './mainReducer';

const store = createStore(MainReducer);
ReactDOM.render(
  <Provider store={store}>
    <CountryDisplay />
    </Provider>,
  document.getElementById('root')
);

