import React, { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Grid,
	CircularProgress,
	useTheme,
} from "@mui/material";
import { useGetCarbonStatsQuery } from "state/api";
import BreakdownChart from "./BreakdownChart";

const CarbonFootprintByMonth = () => {
	const theme = useTheme();
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth() + 1); // Adjusting to be 1-based
	const { data, isLoading, isError } = useGetCarbonStatsQuery({ year, month });

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
	};

	return (
		<Box
			gridColumn="span 8"
			gridRow="span 3"
			backgroundColor={theme.palette.background.alt}
			p="1.5rem"
			borderRadius="0.55rem"
		>
			<Typography
				variant="h3"
				color="textPrimary"
				mt={0}
				mb={2}
				sx={{ fontWeight: "bold" }}
			>
				Monthly Carbon Footprint for {data?.carbonData?.month}/
				{data?.carbonData?.year}
			</Typography>
			<Box mt={3}>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={6} md={3}>
						<TextField
							label="Year"
							variant="outlined"
							type="number"
							value={year}
							onChange={handleYearChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6} md={3}>
						<TextField
							label="Month"
							variant="outlined"
							type="number"
							value={month}
							onChange={handleMonthChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						{/* <Button
							variant="contained"
							color="primary"
							onClick={() => {
								// Handle fetching data for selected year and month
							}}
							fullWidth
						>
							Fetch Data
						</Button> */}
					</Grid>
				</Grid>
			</Box>
			<Box mt={3}>
				{isLoading && <CircularProgress />}
				{isError && (
					<Typography variant="body1" color="error">
						Error fetching data. Please try again.
					</Typography>
				)}
				{data && (
					<>
						<Typography
							variant="h1"
							color="textPrimary"
							sx={{
								fontWeight: "bold",
								fontSize: 45,
								color: data?.isGood ? "green" : "red",
							}}
						>
							{parseInt(data.totalCarbonByPerson)} KGs CO<sub>2</sub>
						</Typography>
						{/* <ul>
							{Object.entries(data.carbonData.categories).map(
								([category, value]) => (
									<li key={category}>
										{category}: {parseInt(value)}
									</li>
								)
							)}
						</ul> */}
						<Box
							display="flex"
							justifyContent="space-between"
							// alignItems="center"
							flex-direction="column"
						>
							{data?.carbonData?.categories && (
								<BreakdownChart
									categories={data?.carbonData?.categories}
									isDashboard={true}
									beSmall={true}
								/>
							)}
							<Box
								display="flex"
								flex-direction="column"
								justifyContent="center"
								paddingTop={12}
								// alignItems="center"
							>
								<Typography
									variant="h2"
									sx={{
										// fontSize: 20,
										fontWeight: "bold",
										color: data?.isGood ? "green" : "red",
									}}
								>
									{parseInt(data?.percentageIncDec)}%{" "}
									{data?.isGood ? `LESS` : `MORE`}
								</Typography>
								<Typography
									variant="h3"
									sx={{ marginLeft: 2, fontWeight: "bold" }}
								>
									than the standard values ({data.totalStandardValues} KGs) for
									a person.
								</Typography>
							</Box>
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
};

export default CarbonFootprintByMonth;
