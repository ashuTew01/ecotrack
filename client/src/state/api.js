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
	tagTypes: ["User", "Dashboard"],
	endpoints: (build) => ({
		getUser: build.query({
			query: () => ({
				url: "userdata/get-user",
				method: "GET",
				headers: DEFAULT_HEADERS,
			}),
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
				headers: DEFAULT_HEADERS,
			}),
		}),
		getRandomEcofriendlyTips: build.query({
			query: () => ({
				url: "eco-tips/get-random",
				method: "GET",
				headers: DEFAULT_HEADERS,
			}),
		}),
		getOneTip: build.query({
			query: () => ({
				url: "eco-tips/get-one",
				method: "GET",
				headers: DEFAULT_HEADERS,
			}),
		}),

		//****************************EcoTips and WHO Stds. End*****************************/

		// **********************Carbon START************************************
		getCarbonStats: build.query({
			query: ({ year, month }) => ({
				url: `carbon/get-stats/${year}/${month}`,
				method: "GET",
				headers: DEFAULT_HEADERS,
			}),
			maxRetries: 2,
		}),
		getTwelveMonthCarbon: build.query({
			query: () => ({
				url: `carbon/get-twelve-month/`,
				method: "GET",
				headers: DEFAULT_HEADERS,
			}),
		}),

		saveCarbonData: build.mutation({
			query: (data) => ({
				url: `carbon/save`,
				method: "POST",
				body: data,
				headers: DEFAULT_HEADERS,
			}),
		}),

		//****************************Carbon END***************************/

		// **********************Carbon START************************************
		getWaterStats: build.query({
			query: ({ year, month }) => ({
				url: `userdata/water-usage/get-stats/${year}/${month}`,
				method: "GET",
				headers: DEFAULT_HEADERS,
			}),
		}),
		getTwelveMonthWater: build.query({
			query: () => ({
				url: `userdata/water-usage/get-twelve-month`,
				method: "GET",
				headers: DEFAULT_HEADERS,
			}),
		}),

		saveWaterData: build.mutation({
			query: (data) => ({
				url: `userdata/water-usage/save`,
				method: "POST",
				body: data,
				headers: DEFAULT_HEADERS,
			}),
		}),

		//****************************Carbon END***************************/
	}),
});

export const {
	useGetGlobalNewsQuery,
	useGetLocalNewsQuery,
	useGetTopHeadlinesQuery,

	useGetRandomEcofriendlyTipsQuery,
	useGetRandomWhoStandardsQuery,
	useGetOneTipQuery,

	useGetCarbonStatsQuery,
	useGetTwelveMonthCarbonQuery,

	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useSaveCarbonDataMutation,

	useGetUserQuery,
} = api;
