import "./App.css";
import Navbar from "./components/navBar/NavBar"
import RoutesPoyect from "./routes/RoutesPoyect";
import Footer from "./components/footer/Footer";
import ApiProvider from "./context/ApiProvider";

const App = () => {
	return (
		<>
		<ApiProvider>
			<Navbar/>
			<RoutesPoyect/>
			<Footer/>
		</ApiProvider>
			
		</>
	);
};

export default App;
