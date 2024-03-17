import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { ResponsiveLine } from "@nivo/line";
import { useGetTwelveMonthCarbonQuery } from "state/api";

const OverviewChart = ({ isDashboard = false }) => {
	const theme = useTheme();
	const { data: carbonStats, isLoading } = useGetTwelveMonthCarbonQuery();

	const carbonData = useMemo(() => {
		if (!carbonStats) return [];

		return Object.entries(carbonStats.monthlyCarbonFootprints)
			.map(([date, value]) => ({
				x: date, // Assuming date format is "yyyy-mm"
				y: value,
			}))
			.reverse(); // Reverse the order of the data array
	}, [carbonStats]);

	if (!carbonStats || isLoading) return "Loading...";

	return (
		<ResponsiveLine
			data={[{ id: "carbonFootprint", data: carbonData }]}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: theme.palette.secondary[200],
						},
					},
					legend: {
						text: {
							fill: theme.palette.secondary[200],
						},
					},
					ticks: {
						line: {
							stroke: theme.palette.secondary[200],
							strokeWidth: 1,
						},
						text: {
							fill: theme.palette.secondary[200],
						},
					},
				},
				legends: {
					text: {
						fill: theme.palette.secondary[200],
					},
				},
				tooltip: {
					container: {
						color: theme.palette.primary.main,
					},
				},
			}}
			margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: "auto",
				max: "auto",
				stacked: false,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="catmullRom"
			enableArea={isDashboard}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: "bottom",
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Month",
				legendOffset: 36,
				legendPosition: "middle",
			}}
			axisLeft={{
				orient: "left",
				tickValues: 5,
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "KGs CO2 released",
				legendOffset: -60,
				legendPosition: "middle",
			}}
			enableGridX={false}
			enableGridY={false}
			pointSize={10}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabelYOffset={-12}
			useMesh={true}
		/>
	);
};

export default OverviewChart;
