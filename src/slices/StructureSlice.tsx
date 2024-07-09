import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Structure } from "../models/structure";

export const structureApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://folder-structure-api.onrender.com/',
    }),
    tagTypes: ["Structure"],
    endpoints: (builder) => ({
        getStructure: builder.query<Structure, void>({
            query: () => '',
            providesTags: ['Structure'],
        }),
    })
});

// // Generate hooks using `build` from the created API

// Define the type for useGetStructureQuery explicitly
export type UseGetStructureQuery = typeof structureApi extends {
    endpoints: {
        getStructure: {
            useQuery: infer T;
        };
    };
} ? T : never;

// Export the useGetStructureQuery hook with the defined type
export const useGetStructureQuery: UseGetStructureQuery = structureApi.endpoints.getStructure.useQuery;
// export const { useGetStructureQuery } = structureApi;