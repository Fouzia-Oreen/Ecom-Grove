import { HEADERS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const headerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      fetchAllHeaders: builder.query({
        query: () => ({
          url: `${HEADERS_URL}`,
        }),
        providesTags: ["Header"],
      }),
      getHeaderById: builder.query({
        query: (headerId) => `${HEADERS_URL}/${headerId}`,
        providesTags: (result, error, headerId) => [
        { type: "Header", id: headerId },
        ],
      }),
      createHeader: builder.mutation({
        query: (headerData) => ({
          url: `${HEADERS_URL}`,
          method: "POST",
          body: headerData,
        }),
        invalidatesTags: ["Header"],
      }),
  
      updateHeader: builder.mutation({
        query: ({ headerId, formData }) => ({
          url: `${HEADERS_URL}/${headerId}`,
          method: "PUT",
          body: formData,
        }),
      }),
  
      uploadImage: builder.mutation({
        query: (data) => ({
          url: `${UPLOAD_URL}`,
          method: "POST",
          body: data,
        }),
      }),
      deleteHeader: builder.mutation({
        query: (headerId) => ({
          url: `${HEADERS_URL}/${headerId}`,
          method: "DELETE",
        }),
        providesTags: ["Header"],
      }),
    }),
  });
  
  export const {
    useFetchAllHeadersQuery,
    useGetHeaderByIdQuery,
    useCreateHeaderMutation,
    useUpdateHeaderMutation,
    useUploadImageMutation,
    useDeleteHeaderMutation,
} = headerSlice;
