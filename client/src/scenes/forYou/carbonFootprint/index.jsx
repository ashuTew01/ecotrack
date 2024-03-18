import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Co2, DownloadOutlined } from "@mui/icons-material";
import {
	Box,
	Button,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetCarbonStatsQuery } from "state/api";
import OverviewBox from "components/OverviewBox";
import CarbonFootprintByMonth from "components/CarbonFootprintByMonth";
import CarbonSaveForm from "components/CarbonSaveForm";

const CarbonFootprint = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1; // Adjusting to be 1-based
	const currentYear = currentDate.getFullYear();

	const { data, isLoading } = useGetCarbonStatsQuery({
		year: currentYear,
		month: currentMonth,
	});

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Header
					title="Carbon Footprint"
					subtitle="How Much Carbon Are You Really Emitting? Uncover Your Impact Now!"
				/>

				<Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: "14px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlined sx={{ mr: "10px" }} />
						COMING SOON
					</Button>
				</Box>
			</FlexBetween>

			{!isLoading && (
				<Box
					mt="20px"
					display="grid"
					gridTemplateColumns="repeat(12, 1fr)"
					gridAutoRows="160px"
					gap="30px"
					sx={{
						"& > div": {
							gridColumn: isNonMediumScreens ? undefined : "span 12",
						},
					}}
				>
					<Box
						gridColumn="span 4"
						gridRow="span 2"
						backgroundColor="transparent"
						p="1rem"
						borderRadius="0.55rem"
						display="flex"
						justifyContent="space-between"
					>
						<Box
							component="img"
							sx={{
								height: 330,
								width: 330,
								// maxHeight: { xs: 233, md: 167 },
								// maxWidth: { xs: 350, md: 250 },
							}}
							alt={data?.isGood ? `Well Done` : `Try Harder`}
							src={data?.isGood ? `/well-done.png` : `/sad.svg`}
						/>
					</Box>
					<Box
						gridColumn="span 8"
						gridRow="span 2"
						backgroundColor="transparent"
						p="1rem"
						borderRadius="0.55rem"
						display="flex"
						flexDirection="column"
						justifyContent="center"
					>
						<Typography variant="h1" sx={{ fontWeight: "bold" }}>
							Your current CO<sub>2</sub> emissions are
						</Typography>
						<Typography
							variant="h1"
							sx={{
								fontSize: 100,
								fontWeight: "bold",
								color: data?.isGood ? "green" : "red",
							}}
						>
							{parseInt(data?.percentageIncDec)}%{" "}
							{data?.isGood ? `LESS` : `MORE`}
						</Typography>
						<Typography variant="h1">
							than the standard values for a person.
						</Typography>
					</Box>
					<Box
						gridColumn="span 4"
						gridRow="span 2"
						// mt="20px"
						display="flex"
						flexDirection="column"
						// gridTemplateColumns="repeat(4, 1fr)" // Update to 4 columns
						// gridTemplateRows="repeat(2, auto)" // Update to 2 rows
						gap="20px"
					>
						{/* ROW 1 */}
						<OverviewBox
							title="Current Month (KGs CO2 Emitted)"
							value={parseInt(data?.totalCarbonByPerson)}
							transport={parseInt(data?.carbonData?.categories?.transport)}
							electricity={parseInt(data?.carbonData?.categories?.electricity)}
							others={parseInt(data?.carbonData?.categories?.others)}
							icon={
								<Co2
									sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
								/>
							}
							rowSpan={2}
							colSpan={4}
						/>
					</Box>
					<Box
						gridColumn="span 8"
						gridRow="span 2"
						backgroundColor={theme.palette.background.alt}
						p="1rem"
						borderRadius="0.55rem"
					>
						<OverviewChart isDashboard={true} />
					</Box>

					{data?.carbonData?.categories && (
						<Box
							gridColumn="span 4"
							gridRow="span 3"
							backgroundColor={theme.palette.background.alt}
							p="1.5rem"
							borderRadius="0.55rem"
						>
							<Typography
								variant="h3"
								sx={{ color: theme.palette.secondary[100], fontWeight: "bold" }}
							>
								Current By Category
							</Typography>
							<BreakdownChart
								categories={data.carbonData.categories}
								isDashboard={true}
							/>
							<Typography
								p="0 0.6rem"
								fontSize="0.8rem"
								sx={{ color: theme.palette.secondary[200] }}
							>
								Breakdown of carbon footprint by the category in which it was
								generated.
							</Typography>
						</Box>
					)}
					<CarbonFootprintByMonth />
					<CarbonSaveForm />
				</Box>
			)}
		</Box>
	);
};

export default CarbonFootprint;
