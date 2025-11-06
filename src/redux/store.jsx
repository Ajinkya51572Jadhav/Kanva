import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import editorReducer from "./editorReducer";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, editorReducer);

export const store = configureStore({
    reducer: {
        "editor": persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // not warning for persist 
        }),
});

export const persistor = persistStore(store);