import React, { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	CircularProgress,
	FormControlLabel,
	Checkbox,
	useTheme,
} from "@mui/material";
import { useSaveCarbonDataMutation } from "state/api";

const CarbonSaveForm = () => {
	const theme = useTheme();
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth() + 1); // Adjusting to be 1-based
	const [mileage, setMileage] = useState("");
	const [distTravelled, setDistTravelled] = useState("");
	const [isPublicTransport, setIsPublicTransport] = useState(false);
	const [electricityUsage, setElectricityUsage] = useState("");
	const [others, setOthers] = useState("");
	const [numPassengers, setNumPassengers] = useState("");

	const [saveCarbonData, { isLoading, isError }] = useSaveCarbonDataMutation();

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
	};

	const handlePublicTransportChange = (event) => {
		setIsPublicTransport(event.target.checked);
		if (!event.target.checked) {
			setNumPassengers(1);
		}
	};

	const handleSubmit = () => {
		saveCarbonData({
			year,
			month,
			mileage,
			distTravelled,
			isPublicTransport,
			electricityUsage,
			others,
			numPassengers: isPublicTransport ? numPassengers : 1,
		});
	};

	return (
		<Box
			gridColumn="span 12"
			gridRow="span 3"
			backgroundColor={theme.palette.background.alt}
			p="1.5rem"
			borderRadius="0.55rem"
			marginBottom={3}
		>
			<Typography
				variant="h3"
				sx={{ color: theme.palette.secondary[100], fontWeight: "bold" }}
			>
				Upload Carbon Data
			</Typography>
			<Box mt={3}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							label="Year"
							variant="outlined"
							type="number"
							value={year}
							onChange={handleYearChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Month"
							variant="outlined"
							type="number"
							value={month}
							onChange={handleMonthChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Mileage (km/l)"
							variant="outlined"
							type="number"
							value={mileage}
							onChange={(e) => setMileage(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Distance Travelled (km)"
							variant="outlined"
							type="number"
							value={distTravelled}
							onChange={(e) => setDistTravelled(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Electricity Usage (kWh)"
							variant="outlined"
							type="number"
							value={electricityUsage}
							onChange={(e) => setElectricityUsage(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={`Others (KGs CO2)`}
							variant="outlined"
							value={others}
							onChange={(e) => setOthers(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<FormControlLabel
							control={
								<Checkbox
									checked={isPublicTransport}
									onChange={handlePublicTransportChange}
								/>
							}
							label="Public Transport"
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Number of Passengers"
							variant="outlined"
							type="number"
							value={numPassengers}
							onChange={(e) => setNumPassengers(e.target.value)}
							disabled={!isPublicTransport}
							fullWidth
						/>
					</Grid>
				</Grid>
			</Box>
			<Button
				variant="outlined"
				color="secondary"
				onClick={handleSubmit}
				disabled={isLoading}
				sx={{ mt: 4, fontSize: 15, p: 2, paddingInline: 4 }}
			>
				{isLoading ? <CircularProgress size={24} /> : "Upload Data"}
			</Button>
			{isError && (
				<Typography variant="body1" color="error" sx={{ mt: 2 }}>
					Error uploading data. Please try again.
				</Typography>
			)}
		</Box>
	);
};

export default CarbonSaveForm;
