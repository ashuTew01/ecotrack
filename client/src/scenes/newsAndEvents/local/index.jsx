import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import NewsFeedCard from "components/NewsCard";
import { useGetLocalNewsQuery } from "state/api.js";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const LocalNews = () => {
	const theme = useTheme();
	// const [page, setPage] = useState(1);
	// const [pageSize, setPageSize] = useState(30);
	const { data, isLoading } = useGetLocalNewsQuery({
		page: 1,
		pageSize: 30,
	});
	// console.log(data);
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Local News & Events"
				subtitle="From Street to Stream: Stay Connected with Local News and Happenings!"
			/>
			<Box mt="40px" height="75vh">
				{isLoading || !data ? (
					<Box sx={{ width: "60%", margin: "2rem 0 2rem 0.2rem" }}>
						<p
							style={{
								color: `${theme.palette.secondary[500]}`,
							}}
						>
							LOADING...
						</p>
						<LinearProgress />
					</Box>
				) : (
					data.articles.map((article, index) => (
						<NewsFeedCard
							key={index} // Add a unique key for each card
							title={article.title}
							content={article.description}
							image={article.urlToImage}
							source={article.source.name}
							publishedAt={article.publishedAt}
							url={article.url}
						/>
					))
				)}
			</Box>
		</Box>
	);
};

export default LocalNews;
