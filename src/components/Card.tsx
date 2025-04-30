import {useCart} from "../context/CartContext.tsx";
import {Link} from "react-router-dom";

function Card({item, onAddToCart}){

    return (
        <div className="m-auto overflow-hidden w-16 h-80 bg-white text-black p-4 rounded-lg shadow-lg flex flex-col items-center w-full max-w-6xl">
            <Link to={`product/${item.id}`} className='w-full text-center flex flex-col items-center'>
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-contain mb-2"
                />
                <h2 className="overflow-hidden text-lg font-semibold text-center">{item.title}</h2>
                <p className="text-gray-700 font-bold">${item.price}</p>

            </Link>
            <button
                className="mt-2 bg-blue-500  py-1 px-4 rounded"
                onClick={() => onAddToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image
                })}
            >
                Add to Cart
            </button>
        </div>
    );
}

export default Card;