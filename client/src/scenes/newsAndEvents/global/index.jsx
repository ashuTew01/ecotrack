import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "components/Header";
import NewsFeedCard from "components/NewsCard";
import { useGetGlobalNewsQuery } from "state/api.js";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const GlobalNews = () => {
	const theme = useTheme();
	const [page, setPage] = useState(1); // State to track current page
	const pageSize = 10; // Number of items per page

	// Fetch news data based on page and pageSize
	const { data, isLoading } = useGetGlobalNewsQuery({
		page,
		pageSize,
	});

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1); // Increment page number
	};

	const handlePrevPage = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page number, but ensure it's not less than 1
	};

	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Global News & Events"
				subtitle="Stay Informed, Change the World: Explore Global News and Events Shaping Our Future!"
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
					<>
						{data.articles.map((article, index) => (
							<NewsFeedCard
								key={index} // Add a unique key for each card
								title={article.title}
								content={article.description}
								image={article.urlToImage}
								source={article.source.name}
								publishedAt={article.publishedAt}
								url={article.url}
							/>
						))}
						<Box
							mt={3}
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Button
								variant="outlined"
								color="secondary"
								disabled={page === 1}
								onClick={handlePrevPage}
							>
								Previous Page
							</Button>
							<Typography variant="h5" mx={2}>{`Page ${page}`}</Typography>
							<Button
								variant="outlined"
								color="secondary"
								onClick={handleNextPage}
							>
								Next Page
							</Button>
						</Box>
						<Box height={20}></Box>
					</>
				)}
			</Box>
		</Box>
	);
};

export default GlobalNews;
