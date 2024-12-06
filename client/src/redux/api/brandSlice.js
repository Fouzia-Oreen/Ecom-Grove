import { BRAND_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const brandSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBrand: builder.mutation({
          query: (newBrand) => ({
            url: `${BRAND_URL}`,
            method: "POST",
            body: newBrand,
          }),
        }),
    
        updateBrand: builder.mutation({
          query: ({ brandId, updatedBrand }) => ({
            url: `${BRAND_URL}/${brandId}`,
            method: "PUT",
            body: updatedBrand,
          }),
        }),
    
        deleteBrand: builder.mutation({
          query: (brandId) => ({
            url: `${BRAND_URL}/${brandId}`,
            method: "DELETE",
          }),
        }),
    
        fetchBrands: builder.query({
          query: () => `${BRAND_URL}/brands`,
        }),
      }),
})

export const {
    useCreateBrandMutation,
    useDeleteBrandMutation,
    useFetchBrandsQuery,
    useUpdateBrandMutation,
} = brandSlice;
