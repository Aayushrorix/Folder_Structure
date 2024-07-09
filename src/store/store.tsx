import { configureStore } from "@reduxjs/toolkit";
import { structureApi } from "../slices/StructureSlice";

export const store = configureStore({
    reducer: {
        [structureApi.reducerPath] : structureApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(structureApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;