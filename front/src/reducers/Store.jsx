import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./AppReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // Disable serializable check
    })
})

export const persistor = persistStore(store);