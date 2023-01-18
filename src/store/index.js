//normal import
import { combineReducers } from "redux";
import fetchSlice from "./fetchSlice";
import cartSlice from "./cartSlice";

// import persist things
import { configureStore } from "@reduxjs/toolkit";
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
  fetchSlice,
  cartSlice,
});

// represent reducer key value , takes config variable and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// our store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
