import { SUBCATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const subCategorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSubCategory: builder.mutation({
          query: (newSubCategory) => ({
            url: `${SUBCATEGORY_URL}`,
            method: "POST",
            body: newSubCategory,
          }),
        }),
    
        updateSubCategory: builder.mutation({
          query: ({ subCategoryId, updatedSubCategory }) => ({
            url: `${SUBCATEGORY_URL}/${subCategoryId}`,
            method: "PUT",
            body: updatedSubCategory,
          }),
        }),
    
        deleteSubCategory: builder.mutation({
          query: (subCategoryId) => ({
            url: `${SUBCATEGORY_URL}/${subCategoryId}`,
            method: "DELETE",
          }),
        }),
    
        fetchSubCategories: builder.query({
          query: () => `${SUBCATEGORY_URL}/subcategories`,
        }),
      }),
})

export const {
    useCreateSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,
    useFetchSubCategoriesQuery,
} = subCategorySlice;