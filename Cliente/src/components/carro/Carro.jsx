import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../context/ApiProvider";

const Carro = () => {
    const { cart,removeFromCart } = useContext(ApiContext);
    const [total, setTotal] = useState(0);

    // Función para calcular el total a pagar
    const calcularTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.precio;
        });
        setTotal(total);
    };

    // Función para eliminar todos los elementos del carrito
    const vaciarCarrito = () => {
        setCart([]);
        setTotal(0);
    };

    // Calcular el total cada vez que cambie el carrito
    useEffect(() => {
        calcularTotal();
    }, [cart]);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Carrito de Compra</h1>
            {cart.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cart.map((item) => (
                            <>
                             <div key={item.id} className="bg-white p-4 rounded shadow">
                                <img src={`data:image/png;base64,${btoa(
                                            new Uint8Array(item.img.data).reduce(
                                                (data, byte) => data + String.fromCharCode(byte),
                                                ''
                                            )
                                        )}`} alt={item.nombre} className="h-32 w-full object-cover mb-4" />
                                <h2 className="text-lg font-bold">{item.nombre}</h2>
                                <p className="text-gray-600">{item.descripcion}</p>
                                <p className="text-gray-800 mt-2">${item.precio}</p>
                                <p className="text-gray-800 mt-2">#{item.stock}</p>
                                <button
                                    type="button"
                                    onClick={() => removeFromCart (item.id) }
                                    class="rounded-full p-2 bg-red-500 text-white "
                                    > 
                                    X
                                </button>
                            </div>
                            
                            </>
                           
                        ))}
                    </div>
                    <div className="mt-4">
                        <p className="text-xl font-bold">Total a pagar: ${total}</p>
                        <button onClick={vaciarCarrito} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Vaciar Carrito</button>
                    </div>
                    
                </>
            ) : (
                <p>No hay elementos en el carrito</p>
            )}
        </div>
    );
};

export default Carro;


{/* <div class="bg-gray-100 h-screen py-8">
<div class="container mx-auto px-4">
    <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
    <div class="flex flex-col md:flex-row gap-4">
        <div class="md:w-3/4">
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="text-left font-semibold">Product</th>
                            <th class="text-left font-semibold">Price</th>
                            <th class="text-left font-semibold">Quantity</th>
                            <th class="text-left font-semibold">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(product => (
                             <tr>
                             <td class="py-4">
                                 <div class="flex items-center">
                                     <img class="h-16 w-16 mr-4" src="https://via.placeholder.com/150" alt="Product image"/>
                                     <span class="font-semibold">{product.nombre}Product name</span>
                                 </div>
                             </td>
                             <td class="py-4">$19.99</td>
                             <td class="py-4">
                                 <div class="flex items-center">
                                     <button class="border rounded-md py-2 px-4 mr-2">-</button>
                                     <span class="text-center w-8">1</span>
                                     <button class="border rounded-md py-2 px-4 ml-2">+</button>
                                 </div>
                             </td>
                             <td class="py-4">$19.99</td>
                         </tr>

                        ))}
                       

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div> */}