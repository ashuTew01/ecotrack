import React, { useState } from "react";
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
import { useGetRandomWhoStandardsQuery } from "state/api";

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
				<Typography variant="h3" component="div" sx={{}}>
					{title}
				</Typography>
				<Box height={10}></Box>
				{/* <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
					${Number(price).toFixed(2)}
				</Typography> */}
				{/* <Rating value={rating} readOnly /> */}

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

const WHOstandards = () => {
	const theme = useTheme();
	const { data: apiData, isLoading } = useGetRandomWhoStandardsQuery();
	const isNonMobile = useMediaQuery("(min-width: 1000px)");
	const data = apiData?.data;
	console.log(apiData);

	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="WHO Standards (Hit Refresh!)"
				subtitle="Who Knew Meeting WHO Standards Could Be This Vital.. Refresh to see new ones."
			/>
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

export default WHOstandards;
