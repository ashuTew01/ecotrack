import React from "react";
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	AssessmentOutlined,
	WaterDrop,
	Co2,
	Favorite,
	LocalHospital,
	Announcement,
	Newspaper,
	Public,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
	{
		text: "Dashboard",
		route: "dashboard",
		icon: <HomeOutlined />,
	},
	{
		text: "Environment Metrics",
		route: "envmetrics",
		icon: <AssessmentOutlined />,
	},
	{
		text: "For You",
		icon: null,
	},
	{
		text: "Water Usage",
		route: "water-usage",
		icon: <WaterDrop />,
	},
	{
		text: "Carbon Footprint",
		route: "carbon-footprint",
		icon: <Co2 />,
	},
	{
		text: "Ecofriendly Tips",
		route: "ecofriendly-tips",
		icon: <Favorite />,
	},
	{
		text: "WHO Standards",
		route: "who-standards",
		icon: <LocalHospital />,
	},
	{
		text: "News & Events",
		route: null,
		icon: null,
	},
	{
		text: "Top Headlines",
		route: "top-headlines",
		icon: <Announcement />,
	},
	{
		text: "Local",
		route: "local-news",
		icon: <Newspaper />,
	},
	{
		text: "Global",
		route: "global-news",
		icon: <Public />,
	},
];

const Sidebar = ({
	user,
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) => {
	const { pathname } = useLocation(); //curr location where we are
	const [active, setActive] = useState(""); //what page we are currently at.
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						"& .MuiDrawer-paper": {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							// boxSixing: "border-box",
							borderWidth: isNonMobile ? 0 : "2px",
							width: drawerWidth,
						},
					}}
				>
					<Box width="100%">
						{/* box for the logo START */}
						<Box m="1.5rem 2rem 2rem 3rem">
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display="flex" alignItems="center" gap="0.5rem">
									<Typography variant="h4" fontWeight="bold">
										ECOTRACK
									</Typography>
								</Box>
								{/* if mobile, display a close button */}
								{!isNonMobile && (
									<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
										<ChevronLeft />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						{/* box for the logo END */}
						<List>
							{navItems.map(({ text, route, icon }) => {
								if (!icon) {
									return (
										<Typography
											key={route + text}
											sx={{ m: "1.75rem 0 0.75rem 3rem" }}
										>
											{text}
										</Typography>
									);
								}
								const lcText = route;

								return (
									<ListItem key={text} disablePadding>
										{" "}
										{/* removing disablePadding also gives it a nice distinctive look */}
										<ListItemButton
											onClick={() => {
												navigate(`/${route}`);
												setActive(lcText);
											}}
											sx={{
												backgroundColor:
													active === lcText
														? theme.palette.secondary[300]
														: "transparent",
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[100],
											}}
										>
											<ListItemIcon
												sx={{
													ml: "1.8rem",
													color:
														active === lcText
															? theme.palette.primary[600]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
											{active === lcText && (
												<ChevronRightOutlined sx={{ ml: "auto" }} />
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>

					<Box marginBottom="1.5rem" bottom="2px">
						<Divider />
						<FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="40px"
								width="40px"
								borderRadius="50%"
								sx={{ objectFit: "cover" }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.9rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.8rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box>
							<SettingsOutlined
								sx={{
									color: theme.palette.secondary[300],
									fontSize: "25px ",
								}}
							/>
						</FlexBetween>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
