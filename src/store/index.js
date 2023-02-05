//normal import
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import AuthSlice from "./AuthSlice";
// import persist things
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//import brower localStorage
import storage from "redux-persist/lib/storage";

// configuration for select localStorage or Section
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// add your slices before add to store
const rootReducer = combineReducers({
  cartSlice,
  AuthSlice,
  userSlice,
});

// represent reducer , takes config variable and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// solve "A non-serializable value was detected "
const customizedMiddleware = getDefaultMiddleware({serializableCheck:false})

// our store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});


export let persistor = persistStore(store);
