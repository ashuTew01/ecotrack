import React, { useState } from "react";
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
	ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";

import { removeCredentials } from "state/authSlice";
import { useLogoutMutation } from "state/api";

import {
	AppBar,
	Button,
	Box,
	Typography,
	IconButton,
	InputBase,
	Toolbar,
	Menu,
	MenuItem,
	useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);

	const { userInfo } = useSelector((state) => state.auth);

	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(removeCredentials());
			navigate("/login");
		} catch (error) {
			console.log(error);
			// toast.error("Coudn't log you out. Try again!");
		}
		setAnchorEl(null);
	};

	return (
		<AppBar
			sx={{
				position: "static",
				background: "none",
				boxShadow: "none",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* Left Side */}
				<FlexBetween>
					<IconButton
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						sx={{ marginRight: "1rem" }}
					>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						backgroundColor={theme.palette.background.alt}
						borderRadius="9px"
						gap="3px"
						p="0.1rem 1.5rem"
					>
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>

				{/* RIGHT SIDE */}
				<FlexBetween gap="1.5rem">
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlined sx={{ fontSize: "25px" }} />
						) : (
							<LightModeOutlined sx={{ fontSize: "25px" }} />
						)}
					</IconButton>
					<IconButton>
						<SettingsOutlined sx={{ fontSize: "25px" }} />
					</IconButton>

					<FlexBetween>
						<Button
							onClick={handleClick}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								textTransform: "none",
								gap: "1rem",
							}}
						>
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="32px"
								width="32px"
								borderRadius="50%"
								sx={{ objectFit: "cover" }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.85rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.75rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box>
							<ArrowDropDownOutlined
								sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
							/>
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={isOpen}
							onClose={logoutHandler}
							anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
						>
							<MenuItem onClick={logoutHandler}>Log Out</MenuItem>
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
