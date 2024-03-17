import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

const CarbonFootprint = () => {
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="Carbon Footprint"
				subtitle="How Much Carbon Are You Really Emitting? Uncover Your Impact Now!"
			/>
			<Box mt="40px" height="75vh"></Box>
		</Box>
	);
};

export default CarbonFootprint;
