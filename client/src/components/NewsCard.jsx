import React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	IconButton,
	useTheme,
	Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const NewsFeedCard = ({ title, content, image, source, publishedAt, url }) => {
	const theme = useTheme();

	// Helper function to lighten a color (optional, adjust lightness factor as needed)
	const lightenColor = (color, amount) => {
		const rgb = color.replace(
			/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
			function (_, r, g, b) {
				const rgbValues = parseInt(r, 16),
					greenValues = parseInt(g, 16),
					blueValues = parseInt(b, 16);
				return (
					"#" +
					(Math.max(Math.round(2.55 * rgbValues + amount * 255), 0)
						.toString(16)
						.padStart(2, "0") +
						Math.max(Math.round(2.55 * greenValues + amount * 255), 0)
							.toString(16)
							.padStart(2, "0") +
						Math.max(Math.round(2.55 * blueValues + amount * 255), 0)
							.toString(16)
							.padStart(2, "0"))
				);
			}
		);
		return rgb;
	};

	const cardStyles = {
		root: {
			backgroundColor: theme.palette.background.alt, // Use alt background from theme
			display: "flex",
			flexDirection: "row",
			borderRadius: 2,
			boxShadow: theme.shadows[2],
			transition: "background-color 0.2s ease-in-out",
			marginBottom: theme.spacing(2), // Add margin between cards
			"&:hover": {
				backgroundColor: lightenColor(theme.palette.background.alt, 0.05), // Slightly lighten on hover
				cursor: "default", // Prevent pointer cursor
			},
			width: 1,
			height: 0.6,
		},
		media: {
			width: 220, // Adjust image width as needed
			height: 165,
			marginRight: theme.spacing(2),
		},
		content: {
			flex: 1,
			display: "flex",
			flexDirection: "column",
		},
		info: {
			marginTop: "auto", // Push info to bottom
			fontSize: theme.typography.fontSize + 2, // Increase info font size
			color: theme.palette.text.secondary,
		},
		date: {
			fontWeight: "bold", // Make date stand out
		},
		readMore: {
			display: "flex", // Align read more horizontally
			alignItems: "center",
			justifyContent: "flex-end", // Align to right
			fontSize: theme.typography.fontSize + 1, // Adjust read more icon size
			color: theme.palette.text.secondary, // Use secondary text color
		},
	};

	const handleCardClick = () => {
		if (url) {
			window.location.href = url; // Open link on card click
		}
	};

	return (
		<Grid container item xs={12}>
			<Card sx={cardStyles.root} onClick={handleCardClick}>
				<CardMedia
					component="img"
					height="140"
					image={image}
					alt={title}
					sx={cardStyles.media}
				/>
				<CardContent sx={cardStyles.content}>
					<Typography
						variant="h3"
						component="div"
						style={{ fontWeight: "bold" }}
					>
						{title}
					</Typography>
					<Box height={4}></Box>
					<Typography
						variant="h6"
						color="text.primary"
						style={{ marginBottom: theme.spacing(1) }}
					>
						{content}
					</Typography>
					<Typography variant="h6" sx={{ color: theme.palette.primary[200] }}>
						{`${source}`}
					</Typography>
					<Typography variant="h6" sx={{ color: theme.palette.primary[200] }}>
						<span sx={cardStyles.date}>
							{new Date(publishedAt).toLocaleDateString()}
						</span>
						{` - ${new Date(publishedAt).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}`}
					</Typography>
				</CardContent>
				<IconButton sx={cardStyles.readMore}>
					<Typography variant="body1">
						{/* No separate hover effect */}
					</Typography>
					<ArrowForwardIosIcon />
				</IconButton>
			</Card>
		</Grid>
	);
};

export default NewsFeedCard;
