import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; 

import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/user.reducer';
import { clientReducer } from './reducers/client.reducer';
import { invoiceListReducer } from './reducers/invoice.reducer';

const reducer = {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    clientList: clientReducer,
    invoiceList: invoiceListReducer,
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore ({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;