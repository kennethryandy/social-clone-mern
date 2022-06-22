import { useEffect } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useLocalStorage from './hooks/useLocalStorage';
// Components
import NavBar from "./components/Nav/NavBar";
import AuthService from './components/AuthService';
import ProtectedRoute from './components/ProtectedRoute';
import { AppBarSpacer } from './utils/GlobalStylesComp';
// Pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './components/Profile/Profile';

const darkTheme = {
	palette: {
		mode: "dark",
		primary: {
			// light: "#B0B3B8",
			light: "#272b31",
			main: "#B0B3B8",
			// main: "#393e46",
			dark: "#60646b",
			contrastText: "#fff",
		},
		secondary: {
			light: "#a6a6a6",
			main: "#eeeeee",
			dark: "#f1f1f1",
			contrastText: "#000",
		},
		neutral: {
			light: '#4e96b0',
			main: '#227c9d',
			dark: '#17566d',
			contrastText: '#e9ebee',
		},
		background: {
			// paper: "#424242"
			paper: "#18191A"
		}
	},
};
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
	const [theme, setTheme] = useLocalStorage('mode', lightTheme);

	useEffect(() => {
		const body = document.body;
		console.log(theme);
		console.log(body);
		if (body.classList.contains("dark") && theme.palette.mode === "light") {
			body.classList.remove("dark");
		} else {
			body.classList.add("dark");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleThemeChange = () => {
		const body = document.body;
		setTheme(currentTheme => currentTheme.palette.mode === "dark" ? lightTheme : darkTheme);
		if (body.classList.contains("dark") && theme.palette.mode === "dark") {
			return body.classList.remove("dark");
		}
		return body.classList.add("dark");
	}

	return (
		<ThemeProvider theme={responsiveFontSizes(createTheme(theme))}>
			<BrowserRouter>
				<NavBar handleThemeChange={handleThemeChange} mode={theme.palette.mode} />
				<AppBarSpacer />
				<Routes>
					<Route path="/" index element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="/post/:postId" index element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} >
						<Route path=":id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
					</Route>
					<Route path="/register" element={<AuthService><Signup /></AuthService>} />
					<Route path="/login" element={<AuthService><Login /></AuthService>} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
