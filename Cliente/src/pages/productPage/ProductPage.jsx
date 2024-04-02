import axios from "axios";
import { useState, useEffect } from "react";

const ProductPage = () => {
    const urlBaseServer = "http://localhost:3000";
    const [productos, setProductos] = useState([]);

    const getproductos = async () => {
        const { data: prod } = await axios.get(`${urlBaseServer}/prod`);
        setProductos([...prod.data]);
    };

    useEffect(() => {
        getproductos();
    }, []);

    return (
        <div className="bg-white">
          <div className="flex">
          
          </div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
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
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
