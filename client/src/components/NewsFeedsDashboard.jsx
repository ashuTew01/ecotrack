import React from "react";
import { Box, Typography } from "@mui/material";
import NewsFeedCard from "components/NewsCard";
import { useGetGlobalNewsQuery } from "state/api.js";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const NewsFeedDashboard = () => {
	const theme = useTheme();
	const { data, isLoading } = useGetGlobalNewsQuery({
		page: 1,
		pageSize: 30,
	});

	return (
		<>
			<Typography marginTop="0.5rem" fontWeight="bold" variant="h2">
				Global Environment News
			</Typography>
			<Box
				mt="40px"
				height="26.5rem"
				overflow="auto" // Enable scrolling
				sx={{
					"&::-webkit-scrollbar": {
						width: "6px",
					},
					"&::-webkit-scrollbar-track": {
						background: theme.palette.background.default,
					},
					"&::-webkit-scrollbar-thumb": {
						background: theme.palette.secondary.main,
						borderRadius: "3px",
					},
				}}
			>
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
		</>
	);
};

export default NewsFeedDashboard;
