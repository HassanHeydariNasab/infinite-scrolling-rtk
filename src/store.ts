import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { songsApi } from "./songs.api";

export const store = configureStore({
  reducer: combineReducers({ [songsApi.reducerPath]: songsApi.reducer }),
  middleware: getDefaultMiddleware().concat([songsApi.middleware])
});

setupListeners(store.dispatch);
