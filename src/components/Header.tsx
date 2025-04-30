import Cart from "./Cart.tsx";
import {useCart} from "../context/CartContext.tsx";
import CartModal from "./CartModal.tsx";
import {useState} from "react";


function Header() {

    const {cart, clearCart} = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <header className="p-4 flex justify-between items-center">
            <div className="headerContainer w-full flex justify-center">
                <h2 className="text-2xl decoration-red-100 m-10 font-bold">Atelier De Cire</h2>
            </div>
            <button
                onClick={() => setIsCartOpen(true)}
                className="text-2xl"
                aria-label='Open cart'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                </svg>
                {cart.reduce((total, item) => total + item.quantity, 0)} | ${total.toFixed(2)}
            </button>
            <button
                onClick={clearCart}
                className="text-sm text-red-600"
                aria-label='Clear cart'
            >
                Clear Cart
            </button>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>

        </header>
    );
}

export default Header;