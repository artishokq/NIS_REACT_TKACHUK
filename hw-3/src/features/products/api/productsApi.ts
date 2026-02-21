import { baseApi } from "@/shared/api/baseApi";
import type { ProductsResponse, ProductsQueryParams } from "@/entities/product";
import type { Product } from "@/entities/product";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ limit, skip, q }) => {
        if (q) {
          return {
            url: "/products/search",
            params: { q, limit, skip },
          };
        }
        return {
          url: "/products",
          params: { limit, skip },
        };
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    getCategories: builder.query<
      { slug: string; name: string; url: string }[],
      void
    >({
      query: () => "/products/categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi;
