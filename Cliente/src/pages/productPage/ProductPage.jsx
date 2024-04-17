import { useContext } from "react";
import { ApiContext } from "../../context/ApiProvider";
import CategoriaF from "../../components/filtro/CategoriaF";
import Filtro from "../../components/filtro/Filtro";

const ProductPage = () => {

    const {productos,addToCart,setFiltro,setCate} = useContext(ApiContext)
 

    return (
                <div className="bg-white">
                <div className="flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex-col ">
                        <CategoriaF setcatevalue={setCate}/>
                        <Filtro setfiltrovalue={setFiltro}/>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    
                        {productos.map((product) => (
                            <a key={product.id} className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={`data:image/png;base64,${btoa(
                                            new Uint8Array(product.img.data).reduce(
                                                (data, byte) => data + String.fromCharCode(byte),
                                                ''
                                            )
                                        )}`}
                                        alt={product.nombre}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h1 className="mt-4 text-lg text-gray-800">{product.nombre}</h1>
                                <h3 className="mt-4 text-sm text-gray-700">{product.descripcion}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">Precio: {product.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                                <p className="mt-1 text-lg font-medium text-gray-900">Stock: {product.stock}</p>
                                <button
                                type="button"
                                className="inline-block rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                                onClick={() => addToCart(product)}
                                >
                                    Añadir al carrito
                                </button>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
           
    );
};

export default ProductPage;
