
import {useEffect, useState} from "react";
import Card from "./Card.tsx";
import {useCart} from "../context/CartContext.tsx";

function Main() {

    // Состояние для хранения товаров
    const [items, setItems] = useState([]);

    // Состояние для отслеживания количества товаров, которые отображаются для каждой категории
    const [counts, setCounts] = useState({all: 4});

    // Состояние для категорий товаров
    const [categories, setCategories] = useState([]);

    // Состояние для выбранной категории
    const [selectedCategory, setSelectedCategory] = useState('all');


    // Деструктурируем addToCart из контекста корзины для добавления товара в корзину
    const {addToCart} = useCart();



    // Загружаем данные о товарах при монтировании компонента
    useEffect(() => {
        async function fetchProducts() {

            // Выполняем запрос к API для получения товаров
            let response = await fetch('https://fakestoreapi.com/products');

            // Преобразуем ответ в JSON
            const json = await response.json();
            // Сохраняем полученные товары в состояние
            setItems(json);

            // Формируем список категорий (добавляем "all" для фильтрации всех товаров)
            const categories = ['all', ...new Set(json.map(item => item.category))];
            // Сохраняем категории в состояние
            setCategories(categories);
        }
        fetchProducts();
    }, []);


    let filteredItems;

    if (selectedCategory === 'all') {
        filteredItems = items;
    } else {
        filteredItems = items.filter(item => item.category === selectedCategory);
    }


    const handleAddToCart = (item) => {
        addToCart(item);
    }

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="p-2 border rounded w-full"
                    />
                </div>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCounts(prev => ({
                                ...prev,
                                [category]: prev[category] || 4
                            }))
                        }}
                        className={`px-3 py-1 rounded ${
                            selectedCategory === category ? 'bg-blue-500 text-black' : 'bg-gray-200'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.slice(0, counts[selectedCategory]).map((item) => (
                    <Card key={item.id} item={item} onAddToCart={handleAddToCart}/>
                ))}
                <button className="bg-blue-500 text-black p-2 mt-4"
                        onClick={() =>
                            setCounts(prev => ({
                                ...prev,
                                [selectedCategory] : prev[selectedCategory] + 4
                            }))}>
                    Show more
                </button>
            </div>
        </main>
    );
}

export default Main;