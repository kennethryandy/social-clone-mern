import { BrowserRouter, Route, Routes } from "react-router-dom";
// Components
import NavBar from "./components/Nav/NavBar";
import { AppBarSpacer } from './utils/GlobalStylesComp';
// Pages
import Signup from './pages/Signup';

function App () {
	return (
		<BrowserRouter>
			<NavBar />
			<AppBarSpacer />
			<Routes>
				<Route path="/" exact element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
