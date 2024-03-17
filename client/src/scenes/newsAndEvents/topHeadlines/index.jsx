import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

const TopHeadlines = () => {
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Earth's Bulletin"
				subtitle="Stay Updated with the Latest Environmental News!"
			/>
			<Box mt="40px" height="75vh"></Box>
		</Box>
	);
};

export default TopHeadlines;
