import axios from "axios";
import { createContext, useState,useEffect } from "react"

export const ApiContext = createContext()

const ApiProvider = ({children}) => {
    const urlBaseServer = "http://localhost:3000";
    const [productos, setProductos] = useState([]);
    const [cart,setcart] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [categoria, setCate] = useState("");

    const getfiltro = async () => {
        let url = `${urlBaseServer}/prod`; 
        if (filtro && categoria) {
            url = `${urlBaseServer}/filter?categoria=${categoria}&filtro=${filtro}`;
            console.log("EL FILTRO y CATEGORIA SON: "+filtro+"  "+categoria);
        }
        else if (filtro) {
            url = `${urlBaseServer}/filter?filtro=${filtro}`;
            console.log("EL FILTRO ES: "+filtro);
        }
        else if (categoria) {
            url = `${urlBaseServer}/filter?categoria=${categoria}`;
            console.log("LA CATEGORIA ES: "+categoria);
        }
        const { data: prod } = await axios.get(url);
        setProductos([...prod.data]);
    };
    useEffect(() => {
        getfiltro();
    }, [filtro, categoria])

     // Función para verificar si un producto está repetido en el carrito
     const addToCart = (productId) => {
        const itemExist = cart.findIndex(producto => producto.id === productId.id)

        if (itemExist >= 0){
            console.log('ya existe')
             const updateCart = [...cart]
             updateCart[itemExist].quantity++
             setcart(updateCart)
            
        } else {
            productId.quantity = 1
            setcart([...cart, productId]);  
        }
    };

    function removeFromCart (id){
        setcart(prevCart => prevCart.filter(product => product.id !== id))
    }


  return (
    <ApiContext.Provider value={{cart,productos,setcart, setFiltro,setCate, addToCart,removeFromCart}}>
    {children}
   </ApiContext.Provider>
  )
}

export default ApiProvider