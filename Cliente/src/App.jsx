import "./App.css";
import Navbar from "./components/navBar/NavBar"
import RoutesPoyect from "./routes/RoutesPoyect";
import Footer from "./components/footer/Footer";

const App = () => {
	return (
		<>
			<Navbar/>
			<RoutesPoyect/>
			<Footer/>
		</>
	);
};

export default App;
