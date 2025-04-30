import { useCart } from "../context/CartContext";
import { Dialog } from "@headlessui/react";

function CartModal({ isOpen, onClose }) {
    // Деструктурируем данные из контекста корзины
    const { cart, removeFromCart,increaseQuantity,decreaseQuantity } = useCart();

    // Вычисляем общую сумму товаров в корзине
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
                    <Dialog.Title className="text-lg font-bold">🛒 Cart ({cart.length})</Dialog.Title>
                    <ul className="divide-y mt-4">
                        {cart.map((item) => (
                            <li key={item.id} className="py-2 flex justify-between items-center">
                                <span>{item.title}</span>
                                <div className="flex items-center gap-2">
                                    <span>${(item.price * item.quantity).toFixed(2)} ({item.quantity}x)</span>

                                    <button
                                        onClick={() => increaseQuantity(item.id)} // Используем item.id
                                        className="text-gray-500 hover:text-green-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M12 4v16m8-8H4"/>
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => decreaseQuantity(item.id)} // Используем item.id
                                        className="text-gray-500 hover:text-yellow-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M20 12H4"/>
                                        </svg>
                                    </button>
                                    <button
                                        className="text-red-500"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-right font-bold">
                        Total: ${total.toFixed(2)}
                    </div>
                    <div className="mt-6 text-right">
                        <button onClick={onClose} className="bg-blue-500 text-black px-4 py-2 rounded">Close</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default CartModal;