import asyncHandler from "../middleware/asyncHandler.js";
import axios from "axios";

const newsTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `ROUTE newsTest IS WORKING` });
});

const getNewsArticles = asyncHandler(async (req, res) => {
	try {
		const { country, pageSize, q, page } = req.query;
		const apiKey = "ba4c0ce6de1244c1a280bb7cfa38b987";

		// Construct the URL for the News API
		// const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&q=${q}&page=${page}&apiKey=${apiKey}`;
		const url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=environment`;

		//Example
		// https://newsapi.org/v2/top-headlines?apiKey=ba4c0ce6de1244c1a280bb7cfa38b987&country=in&category=business&q=environment%20OR%20climate%20OR%20water%20scarcity%20OR%20earth%20OR%20WHO%20OR%20carbon%20footprint&pageSize=20&page=1
		// q=environment%20OR%20climate%20OR%20water%20scarcity%20OR%20earth%20OR%20WHO%20OR%20carbon%20footprint

		// Call the News API
		const response = await axios.get(url);

		// Check if the response status is OK
		if (response.status === 200) {
			const articles = response.data.articles;
			res.status(200).json({ articles });
		} else {
			res.status(500).json({ message: "Failed to fetch news articles" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

export { newsTest, getNewsArticles };
