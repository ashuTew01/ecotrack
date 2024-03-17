import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

const EnvironmentMetrics = () => {
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="ENVIRONMENT METRICS"
				subtitle="Let's see how good your environment is..."
			/>
			<Box mt="40px" height="75vh"></Box>
		</Box>
	);
};

export default EnvironmentMetrics;
