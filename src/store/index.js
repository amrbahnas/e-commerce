//normal import

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

// represent reducer value , takes config variable and the slice
const persistedReducer = persistReducer(persistConfig, cartSlice);

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
