import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const OverviewBox = ({
	title,
	value,
	icon,
	colSpan,
	rowSpan,
	transport,
	electricity,
	others,
}) => {
	const theme = useTheme();
	return (
		<Box
			gridColumn={`span ${colSpan ? colSpan : 2}`}
			gridRow={`span ${rowSpan ? rowSpan : 1}`}
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			p="1.25rem 1rem"
			flex="1 1 100%"
			backgroundColor={theme.palette.background.alt}
			borderRadius="0.55rem"
		>
			<FlexBetween>
				<Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
					{title}
				</Typography>
				{icon}
			</FlexBetween>
			<Box
				display="flex"
				// justifyContent="space-between"
				alignItems="space-between"
			>
				<Typography
					// variant="h1"
					fontSize={100}
					fontWeight="600"
					sx={{ color: theme.palette.secondary[200] }}
				>
					{value}
				</Typography>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="flex-end"
					paddingBottom={4}
					marginLeft={2}
				>
					<Typography variant="h2" sx={{ fontWeight: "bold" }}>
						kgs
					</Typography>
				</Box>
			</Box>

			<FlexBetween gap="2rem">
				<Typography
					variant="h5"
					// fontStyle="italic"
					sx={{ color: theme.palette.secondary.light }}
				>
					Transport
				</Typography>
				<Typography sx={{ color: theme.palette.grey[400] }}>
					{transport} kgs
				</Typography>
			</FlexBetween>
			<Box height={7}></Box>
			<FlexBetween gap="2rem">
				<Typography
					variant="h5"
					// fontStyle="italic"
					sx={{ color: theme.palette.secondary.light }}
				>
					Electricity
				</Typography>
				<Typography sx={{ color: theme.palette.grey[400] }}>
					{electricity} kgs
				</Typography>
			</FlexBetween>
			<Box height={7}></Box>

			<FlexBetween gap="2rem">
				<Typography
					variant="h5"
					// fontStyle="italic"
					sx={{ color: theme.palette.secondary.light }}
				>
					Others
				</Typography>
				<Typography sx={{ color: theme.palette.grey[400] }}>
					{others} kgs
				</Typography>
			</FlexBetween>
		</Box>
	);
};

export default OverviewBox;
