import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCart} from "../context/CartContext.tsx";


const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const {addToCart} = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div>Loading....</div>

    return (
        <div className="p-6 max-w-2xl mx-auto mt-20">
            <div className="p-6 max-w-2xl mx-auto mt-20 relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-0 left-0 mt-4 ml-4 bg-gray-200 hover:bg-gray-300 text-sm text-black py-1 px-2 rounded shadow"
                >
                    ← Back
                </button>
            </div>

            <img src={product.image} alt={product.title} className="w-full h-96 object-contain mb-4"/>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-semibold mt-2">{product.price} €</p>

            <button
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-6 rounded transition"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>
        </div>
    )
}

export default ProductDetail;