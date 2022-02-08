import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const reducers = combineReducers({});

const persistConfig = {
  key: "root",
  storage,
};

const persisedtReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persisedtReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
