import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//setting up store.
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import authReducer from "./state/authSlice";
import { Provider } from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
const store = configureStore({
	reducer: {
		global: globalReducer,
		[api.reducerPath]: api.reducer,
		auth: authReducer,
	},
	middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
