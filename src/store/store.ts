import * as React from "react";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { postReducer, userReducer, pageReducer } from "./reducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
} from "redux-persist";
import {
  createStateSyncMiddleware,
  initMessageListener,
  initStateWithPrevTab,
  withReduxStateSync,
} from "redux-state-sync";


const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({ postReducer, userReducer, pageReducer });

const persistedReducer = persistReducer(
  persistConfig,
  // @ts-ignore
  withReduxStateSync(reducers)
);

const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(
    thunk,
    createStateSyncMiddleware()
  )
);

initMessageListener(store);
initStateWithPrevTab(store);

export { store, configureStore };
