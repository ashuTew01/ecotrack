import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({
	title,
	value,
	rangeText,
	icon,
	description,
	colSpan,
	rowSpan,
}) => {
	const theme = useTheme();
	return (
		<Box
			gridColumn={`span ${colSpan ? colSpan : 2}`}
			gridRow={`span ${rowSpan ? rowSpan : 1}`}
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			p="1.25rem 1rem"
			flex="1 1 100%"
			backgroundColor={theme.palette.background.alt}
			borderRadius="0.55rem"
		>
			<FlexBetween>
				<Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
					{title}
				</Typography>
				{icon}
			</FlexBetween>

			<Typography
				variant="h3"
				fontWeight="600"
				sx={{ color: theme.palette.secondary[200] }}
			>
				{value}
			</Typography>
			<FlexBetween gap="1rem">
				<Typography
					variant="h5"
					fontStyle="italic"
					sx={{ color: theme.palette.secondary.light }}
				>
					{rangeText}
				</Typography>
				<Typography>{description}</Typography>
			</FlexBetween>
		</Box>
	);
};

export default StatBox;
