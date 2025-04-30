import {createContext, useContext, useEffect, useReducer, useState} from "react";
import { toast } from 'react-toastify';

// Создаем контекст корзины
const CartContext = createContext(null);

// Начальное состояние корзины — пустой массив
const initialState = [];



// Редьюсер для управления состоянием корзины
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            // Проверка, есть ли уже товар в корзине
            const existingIndex = state.findIndex(item => item.id === action.payload.id);

            if (existingIndex !== -1) {
                // Если товар уже есть, увеличиваем количество на 1
                const updatedCart = [...state];
                updatedCart[existingIndex].quantity +=1;
                return updatedCart;
            } else {
                // Если товара нет, добавляем его с количеством 1
                const {id, title, price, image} = action.payload;
                return [...state, {id, title, price, image, quantity: 1}]
            }
        case 'REMOVE_FROM_CART':
            // Удаляем товар из корзины по id
            return state.filter((item) => item.id!== action.payload);
        case 'INCREASE_QUANTITY':
            // Увеличиваем количество товара в корзине
            return state.map((item ) =>
                item.id === action.payload ? {...item, quantity: item.quantity + 1} : item);
        case 'DECREASE_QUANTITY':
            // Уменьшаем количество товара в корзине, но не ниже 1
            return state.map((item) =>
                item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item);
        case 'CLEAR_CART':
            // Очищаем корзину
            return [];
        case 'INIT_CART':
            // Инициализируем корзину с данными из localStorage
            return action.payload;
        default:
            return state;
    }
};

export default function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState);  // Состояние корзины
    const [isInitialized, setIsInitialized] = useState(false);   // Флаг, который показывает, что корзина загружена


    console.log(" current cart state:", state);

    //1. Загружаем из localStorage при первом рендере
    useEffect(() => {
        console.log("Загрузка корзины из localStorage");
        const savedCart = localStorage.getItem('cart'); // Получаем корзину из localStorage
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart); // Парсим данные
            dispatch({type: 'INIT_CART', payload: parsedCart}) // Инициализируем корзину
        }
        setIsInitialized(true); // Устанавливаем флаг инициализации
    }, []);

    // Сохраняем корзину только после инициализации
    useEffect(() => {
        if (isInitialized) {
            console.log("Сохраняем корзину: ", state);
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }, [state, isInitialized]);

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        const existingItem = state.find(item => item.id === product.id);   // Проверяем, есть ли товар в корзине
        if (existingItem) {
            dispatch({ type: 'INCREASE_QUANTITY', payload: product.id }); // Увеличиваем количество, если товар уже есть
            toast.info(`${product.title} quantity increased`);
        } else {
            const { id, title, price, image } = product; // Деструктурируем данные товара
            dispatch({ type: 'ADD_TO_CART', payload: { id, title, price, image } }); // Добавляем новый товар в корзину
            toast.success(`${product.title} added to cart!`);
        }
    }
    const increaseQuantity = (id) => {
        dispatch({type: 'INCREASE_QUANTITY', payload: id});
    }
    const decreaseQuantity = (id) => {
        dispatch({type: 'DECREASE_QUANTITY', payload: id});
    }
    const removeFromCart = (id) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: id});
        toast.info(`Removed from cart`);
    }
    const clearCart = () => {
        dispatch({type: 'CLEAR_CART'});
        toast.info('Cart has been cleared')
    }

    // Возвращаем провайдер с контекстом корзины
    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart,
            increaseQuantity,
            decreaseQuantity
        }} >
            {children}
        </CartContext.Provider>
    )
}

// Хук для использования контекста корзины
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

// Кастомный метод addToCart для удобства todo что за хук и на хук он нужен?

// Кастомный хук для удобства todo что за хук и на хук он нужен?
// 🔧 Это просто удобный способ работы с контекстом.
//     Вместо того чтобы писать в каждом компоненте:
//     const { cart, dispatch } = useContext(CartContext);
// dispatch({ type: 'ADD_TO_CART', payload: item });
//
// Ты пишешь в одном месте (в CartContext.tsx):
// useCart() — это кастомный хук, который просто делает доступ к корзине удобнее.
//Он "оборачивает" useContext, добавляет нужные методы (addToCart, removeFromCart, clearCart).
// Это лучше, чем повторять код useContext(CartContext) в каждом компоненте.
