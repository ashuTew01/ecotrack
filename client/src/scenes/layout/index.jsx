import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"; //this allows us to have the template layouts.
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

const Layout = () => {
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	// const userId = useSelector((state) => state.global.userId);

	return (
		<Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
			<Sidebar
				isNonMobile={isNonMobile}
				drawerWidth="250px"
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Box flexGrow={1}>
				{" "}
				{/* flexGrow = 1 lets it take as much space as it could.*/}
				<Navbar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
