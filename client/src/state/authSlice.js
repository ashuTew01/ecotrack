import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: localStorage.getItem("userInfoEcoTrack")
		? JSON.parse(localStorage.getItem("userInfoEcoTrack"))
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfoEcoTrack", JSON.stringify(action.payload));
		},
		removeCredentials: (state, action) => {
			state.userInfo = null;
			localStorage.removeItem("userInfoEcoTrack");
			localStorage.removeItem("tokenEcoTrack");
		},
	},
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;
