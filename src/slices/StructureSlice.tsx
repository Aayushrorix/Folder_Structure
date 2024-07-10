import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Structure } from "../models/structure";

interface RootFolder{
    value: string
}

interface FileOrFolder{
    value: string;
    type: string;
    parent: string;
}

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

        addRootFolder: builder.mutation<void, RootFolder>({
            query: (structure) => ({
                url: '/initialize-root',
                method: 'POST',
                body: structure,
            }),
            invalidatesTags: ["Structure"],
        }),

        addFileOrFolderFolder: builder.mutation<void, FileOrFolder>({
            query: (structure) => ({
                url: '',
                method: 'POST',
                body: structure,
            }),
            invalidatesTags: ["Structure"],
        }),

        deleteFolderOrFile: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Structure"],
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

export type useAddRootFolderMutation = typeof structureApi extends {
    endpoints: {
        addRootFolder: {
            useQuery: infer T;
        };
    };
} ? T : any;

export type useAddFileOrFolderFolderMutation = typeof structureApi extends {
    endpoints: {
        addFileOrFolderFolder: {
            useQuery: infer T;
        };
    };
} ? T : any;

export type useDeleteFolderOrFileMutation = typeof structureApi extends {
    endpoints: {
        deleteFolderOrFile: {
            useQuery: infer T;
        };
    };
} ? T : any;

// Export the useGetStructureQuery hook with the defined type
export const useGetStructureQuery: UseGetStructureQuery = structureApi.endpoints.getStructure.useQuery;
export const useAddRootFolderMutation: useAddRootFolderMutation = structureApi.endpoints.addRootFolder.useMutation;
export const useAddFileOrFolderFolderMutation: useAddFileOrFolderFolderMutation = structureApi.endpoints.addFileOrFolderFolder.useMutation;
export const useDeleteFolderOrFileMutation: useDeleteFolderOrFileMutation = structureApi.endpoints.deleteFolderOrFile.useMutation;
// export const { useAddRootFolderMutation } = structureApi;