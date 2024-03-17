import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DEFAULT_HEADERS = {
	Authorization: `Bearer ${
		JSON.parse(localStorage.getItem("userInfoEcoTrack"))?.token
	}`,
};

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
	// prepareHeaders: (headers, { getState }) => {
	// 	const token = JSON.parse(localStorage.getItem("userInfoEcoTrack"))?.token; // Optional chaining for nullish coalescing
	// 	console.log(token);
	// 	// console.log("Above should be the token");
	// 	if (token) {
	// 		headers.set("Authorization", `Bearer ${token}`);
	// 	}

	// 	return headers;
	// },
	reducerPath: "adminApi",
	tagTypes: [
		"User",
		"Products",
		"Customers",
		"Transactions",
		"Geography",
		"Sales",
		"Admins",
		"Performance",
		"Dashboard",
	],
	endpoints: (build) => ({
		getUser: build.query({
			query: (id) => `admin/general/user/${id}`,
			providesTags: ["User"],
		}),

		login: build.mutation({
			query: (data) => ({
				url: `auth/login`,
				method: "POST",
				body: data,
			}),
		}),
		register: build.mutation({
			query: (data) => ({
				url: `auth/register`,
				method: "POST",
				body: data,
			}),
		}),
		logout: build.mutation({
			query: () => ({
				url: `auth/logout`,
				method: "POST",
			}),
		}),

		// **********************NEWS START************************************
		getGlobalNews: build.query({
			query: ({ page, pageSize }) => ({
				url: "news/get-global-news",
				method: "GET",
				params: { page, pageSize },
				headers: DEFAULT_HEADERS,
			}),
		}),
		getLocalNews: build.query({
			query: ({ page, pageSize }) => ({
				url: "news/get-local-news",
				method: "GET",
				params: { page, pageSize },
				headers: DEFAULT_HEADERS,
			}),
		}),
		getTopHeadlines: build.query({
			query: ({ page, pageSize }) => ({
				url: "news/get-top-headlines",
				method: "GET",
				params: { page, pageSize },
				headers: DEFAULT_HEADERS,
			}),
		}),
		//****************************NEWS END***************************/

		//****************************EcoTips and WHO Stds. Start***************************/

		getRandomWhoStandards: build.query({
			query: () => ({
				url: "who-standards/get-random",
				method: "GET",
				headers: DEFAULT_HEADERS, // Include headers here
			}),
		}),
		getRandomEcofriendlyTips: build.query({
			query: () => ({
				url: "eco-tips/get-random",
				method: "GET",
				headers: DEFAULT_HEADERS, // Include headers here
			}),
		}),

		//****************************EcoTips and WHO Stds. End*****************************/

		getProducts: build.query({
			query: () => "admin/client/products",
			providesTags: ["Products"],
		}),
		getCustomers: build.query({
			query: () => "admin/client/customers",
			providesTags: ["Customers"],
		}),
		getTransactions: build.query({
			//THIS IS THE REAL ONE.
			query: ({ page, pageSize, sort, search }) => ({
				url: "admin/client/transactions",
				method: "GET",
				params: { page, pageSize, sort, search },
			}),
			providesTags: ["Transactions"],
		}),
		getGeography: build.query({
			query: () => "admin/client/geography",
			providesTags: ["Geography"],
		}),
		getSales: build.query({
			query: () => "admin/sales/sales",
			providesTags: ["Sales"],
		}),
		getAdmins: build.query({
			query: () => "admin/management/admins",
			providesTags: ["Admins"],
		}),
		getUserPerformance: build.query({
			query: (id) => `admin/management/performance/${id}`,
			providesTags: ["Performance"],
		}),
		getDashboard: build.query({
			query: () => "admin/general/dashboard",
			providesTags: ["Dashboard"],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetProductsQuery,
	useGetCustomersQuery,
	useGetTransactionsQuery,
	useGetGeographyQuery,
	useGetSalesQuery,
	useGetAdminsQuery,
	useGetUserPerformanceQuery,
	useGetDashboardQuery,

	useGetGlobalNewsQuery,
	useGetLocalNewsQuery,
	useGetTopHeadlinesQuery,

	useGetRandomEcofriendlyTipsQuery,
	useGetRandomWhoStandardsQuery,

	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
} = api;
