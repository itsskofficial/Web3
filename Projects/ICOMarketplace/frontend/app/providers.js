"use client"

import { StateContextProvider } from "../constants";
import {Toaster} from "react-hot-toast"

const Providers = ({children}) => {
	return (
			<StateContextProvider>
				<Toaster />
				{children}
			</StateContextProvider>
	);
};

export default Providers;
