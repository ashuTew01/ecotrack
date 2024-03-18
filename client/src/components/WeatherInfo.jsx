import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import axios from "axios";
import { Air, DeviceThermostat, WaterDrop } from "@mui/icons-material";

const WeatherInfo = ({ city }) => {
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(true);
	const theme = useTheme();

	useEffect(() => {
		const fetchWeatherData = async () => {
			const apiKey = "54c2582d942cb5184bc315d6d70123e4";
			const lat = 25.4358;
			const lon = 81.8463;
			try {
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
				);
				setWeatherData(response.data);
				console.log(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching weather data: ", error);
				setLoading(false);
			}
		};

		fetchWeatherData();
	}, []);

	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height={200}
				bgcolor={theme.palette.background.alt}
				borderRadius="0.55rem"
				p="1rem"
			>
				<CircularProgress color="secondary" />
			</Box>
		);
	}

	if (!weatherData) {
		return (
			<Box
				bgcolor={theme.palette.background.alt}
				borderRadius="0.55rem"
				p="1rem"
			>
				<Typography variant="body1" color="error">
					Failed to fetch weather data for location.
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			align-items="center"
			p="1rem"
		>
			<Box
				component="img"
				sx={{
					height: 330,
					width: 330,
					// maxHeight: { xs: 233, md: 167 },
					// maxWidth: { xs: 350, md: 250 },
				}}
				alt="Weather"
				src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
			/>

			<Box
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				marginTop={6}
				marginRight={5}
			>
				<Box>
					{" "}
					<Typography variant="h1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
						{weatherData.name}
					</Typography>
				</Box>
				<Box height={5}></Box>
				<Box marginBottom={15}>
					<Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
						<DeviceThermostat fontSize="large" />
						<Box width={6}></Box>
						<Typography variant="h2" sx={{ fontWeight: "bold" }}>
							{parseInt(weatherData?.main?.temp)} °C
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
						<Air fontSize="large" />
						<Box width={6}></Box>
						<Typography variant="h2" sx={{ fontWeight: "bold" }}>
							{weatherData.weather[0].description}
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<WaterDrop fontSize="large" />
						<Box width={6}></Box>
						<Typography variant="h2" sx={{ fontWeight: "bold" }}>
							{weatherData.main.humidity}%
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default WeatherInfo;
