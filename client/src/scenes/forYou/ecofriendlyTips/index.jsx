import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Collapse,
	Button,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Header from "components/Header";
import { useGetRandomEcofriendlyTipsQuery } from "state/api.js";
import { Refresh } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

const StdCard = ({ _id, title, content, type }) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Card
			sx={{
				backgroundImage: "none",
				backgroundColor: theme.palette.background.alt,
				borderRadius: "0.55rem",
			}}
		>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color={theme.palette.secondary[700]}
					gutterBottom
				>
					{type}
				</Typography>
				<Typography variant="h3" component="div">
					{title}
				</Typography>
				<Box height={10}></Box>
				<Typography variant="h5" sx={{ color: theme.palette.primary[100] }}>
					{content}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="primary"
					size="small"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					See More
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
				sx={{
					color: theme.palette.neutral[300],
				}}
			>
				<CardContent>
					<Typography>ID: {_id}</Typography>
					<Typography>More Coming Soon!</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

const EcofriendlyTips = () => {
	const theme = useTheme();
	const {
		data: apiData,
		isLoading,
		refetch,
	} = useGetRandomEcofriendlyTipsQuery();
	const isNonMobile = useMediaQuery("(min-width: 1000px)");
	const data = apiData?.data;
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		if (refresh) {
			refetch();
			setRefresh(false);
		}
	}, [refresh, refetch]);

	const handleClick = () => {
		setRefresh(true);
	};

	return (
		<Box m="1.5rem 2.5rem">
			<Box display="flex" justifyContent="space-between">
				<Header
					title="Ecofriendly Tips (Hit Refresh!)"
					subtitle="Green is the New Cool: Discover Fun Eco-Hacks to Save the Planet! Refresh to see new ones."
				/>
				<Button variant="contained" onClick={handleClick}>
					<FlexBetween>
						<Refresh fontSize="large" />
						<Box width={6}></Box>
						<Typography>Refresh</Typography>
					</FlexBetween>
				</Button>
			</Box>

			{data || !isLoading ? (
				<Box
					mt="20px"
					display="grid"
					gridTemplateColumns="repeat(4, minmax(0, 1fr))"
					justifyContent="space-between"
					rowGap="20px"
					columnGap="1.33%"
					sx={{
						"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
					}}
				>
					{data?.map(({ title, content, type, _id }) => (
						<StdCard
							key={_id}
							_id={_id}
							title={title}
							content={content}
							type={type}
						/>
					))}
				</Box>
			) : (
				<Box sx={{ width: "60%", margin: "2rem 0 2rem 0.2rem" }}>
					<p
						style={{
							color: `${theme.palette.secondary[500]}`,
						}}
					>
						LOADING...
					</p>
					<LinearProgress />
				</Box>
			)}
		</Box>
	);
};

export default EcofriendlyTips;
