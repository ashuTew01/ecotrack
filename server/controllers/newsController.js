import asyncHandler from "../middleware/asyncHandler.js";
import axios from "axios";

const newsTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `ROUTE newsTest IS WORKING` });
});

const getTopHeadlines = asyncHandler(async (req, res) => {
	try {
		const { pageSize, page } = req.query;
		const apiKey = "85cc75be25484d8f8acdcc1d25985bd4";

		const keywords = ["environment", "climate", "carbon"];

		let allArticles = [];

		for (const keyword of keywords) {
			const url = `https://newsapi.org/v2/top-headlines?q=${keyword}&pageSize=${
				pageSize / keywords.length || 10
			}&page=${page || 1}&apiKey=${apiKey}`;
			const response = await axios.get(url);

			if (response.status === 200) {
				const articles = response.data.articles;
				allArticles = allArticles.concat(articles);
			} else {
				console.error(`Failed to fetch articles for keyword "${keyword}"`);
			}
		}

		res
			.status(200)
			.json({ numArticles: allArticles.length, articles: allArticles });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

const getLocalNews = async (req, res) => {
	try {
		const { page, pageSize } = req.query;
		const city = req.user.city.toLowerCase();
		// console.log(city);
		const apiKey = "85cc75be25484d8f8acdcc1d25985bd4";

		// Construct the URL for the News API
		const url = `https://newsapi.org/v2/everything?pageSize=${
			pageSize || 30
		}&q=${city || "prayagraj"}&apiKey=${apiKey}&page=${page || 1}`;

		// %20AND%20(environment%20OR%20climate%20OR%20carbon%20OR%20water)

		// Call the News API
		const response = await axios.get(url);

		// Check if the response status is OK
		if (response.status === 200) {
			const articles = response.data.articles;
			res.status(200).json({ numArticles: articles.length, articles });
		} else {
			res.status(500).json({ message: "Failed to fetch news articles" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const getGlobalNews = async (req, res) => {
	try {
		const { page, pageSize } = req.query;
		// console.log(city);
		const apiKey = "85cc75be25484d8f8acdcc1d25985bd4";

		// Construct the URL for the News API
		const url = `https://newsapi.org/v2/everything?pageSize=${
			pageSize || 30
		}&q=(environment%20OR%20climate%20OR%20carbon%20OR%20water%20OR%20nuclear)&apiKey=${apiKey}&page=${
			page || 1
		}`;

		// Call the News API
		const response = await axios.get(url);

		// Check if the response status is OK
		if (response.status === 200) {
			const articles = response.data.articles;
			res.status(200).json({ numArticles: articles.length, articles });
		} else {
			res.status(500).json({ message: "Failed to fetch news articles" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
// const getTopHeadlines = asyncHandler(async (req, res) => {
// 	try {
// 		const { pageSize, page } = req.query;
// 		const apiKey = "ba4c0ce6de1244c1a280bb7cfa38b987";

// 		// Construct the URL for the News API
// 		// const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&q=${q}&page=${page}&apiKey=${apiKey}`;
// 		const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&q=carbon&pageSize=${
// 			pageSize !== undefined ? pageSize : 20
// 		}&page=${page !== undefined ? page : 1}`;

// 		//Example
// 		// https://newsapi.org/v2/top-headlines?apiKey=ba4c0ce6de1244c1a280bb7cfa38b987&country=in&category=business&q=environment%20OR%20climate%20OR%20water%20scarcity%20OR%20earth%20OR%20WHO%20OR%20carbon%20footprint&pageSize=20&page=1
// 		// q=environment%20OR%20climate%20OR%20water%20scarcity%20OR%20earth%20OR%20WHO%20OR%20carbon%20footprint

// 		// Call the News API
// 		const response = await axios.get(url);

// 		// Check if the response status is OK
// 		if (response.status === 200) {
// 			const articles = response.data.articles;
// 			res.status(200).json({ articles });
// 		} else {
// 			res.status(500).json({ message: "Failed to fetch news articles" });
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Server error" });
// 	}
// });

export { newsTest, getTopHeadlines, getLocalNews, getGlobalNews };
