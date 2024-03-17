import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

const LocalNews = () => {
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Local News & Events"
				subtitle="From Street to Stream: Stay Connected with Local News and Happenings!"
			/>
			<Box mt="40px" height="75vh"></Box>
		</Box>
	);
};

export default LocalNews;
