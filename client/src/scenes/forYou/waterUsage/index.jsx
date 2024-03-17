import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

const WaterUsage = () => {
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Your Water Usage Habits"
				subtitle="Are you saving water, like it is saving you everyday?"
			/>
			<Box mt="40px" height="75vh"></Box>
		</Box>
	);
};

export default WaterUsage;
