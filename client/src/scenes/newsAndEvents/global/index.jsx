import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

const GlobalNews = () => {
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Global News & Events"
				subtitle="Stay Informed, Change the World: Explore Global News and Events Shaping Our Future!"
			/>
			<Box mt="40px" height="75vh"></Box>
		</Box>
	);
};

export default GlobalNews;
