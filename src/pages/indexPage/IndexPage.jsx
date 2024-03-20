import { useContext } from "react";
import { ECommerceContext } from "../../context/ContextProyect";
import Carrusel from "../../components/carrusel/Carrusel";
let slides = [
    "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  ];

const IndexPage = () => {

	const {pruebaContext} =  useContext(ECommerceContext)

	return (
		<div>
			<div className=" m-auto pt-11 w-[100%]">
			<Carrusel slides={slides}/>
			</div>
			<h2>{pruebaContext}</h2>
		</div>
	);
};

export default IndexPage;
