import { useState } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import NavBar from "./components/Nav/NavBar";
import AuthService from './components/AuthService';
import ProtectedRoute from './components/ProtectedRoute';
import { AppBarSpacer } from './utils/GlobalStylesComp';
// Pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

// const darkTheme = {
// 	palette: {
// 		mode: "dark",
// 		primary: {
// 			light: "#272b31",
// 			main: "#393e46",
// 			dark: "#60646b",
// 			contrastText: "#fff",
// 		},
// 		secondary: {
// 			light: "#a6a6a6",
// 			main: "#eeeeee",
// 			dark: "#f1f1f1",
// 			contrastText: "#000",
// 		},
// 		background: {
// 			paper: "#424242"
// 		}
// 	},
// };
const lightTheme = {
	palette: {
		mode: "light",
		primary: {
			light: '#4e96b0',
			main: '#227c9d',
			dark: '#17566d',
			contrastText: '#e9ebee',
		},
		secondary: {
			light: '#45cfc1',
			main: '#17c3b2',
			dark: '#10887c',
			contrastText: '#000',
		}
	}
};

function App () {
	const [theme, setTheme] = useState(lightTheme);
	// console.log(createTheme(theme));
	return (
		<ThemeProvider theme={responsiveFontSizes(createTheme(theme))}>
			<BrowserRouter>
				<NavBar />
				<AppBarSpacer />
				<Routes>
					<Route path="/" index element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="/register" element={<AuthService><Signup /></AuthService>} />
					<Route path="/login" element={<AuthService><Login /></AuthService>} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
