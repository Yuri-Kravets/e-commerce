
import CartModal from "./CartModal.tsx";


function Cart() {


    return(
        <>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Open Cart
            </button>
            <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
)
}

export default Cart;


// todo кастомизация сообщения о добавления и удаления в корзину






















































// 🔧 1. В App.tsx — ToastContainer:
//
//     Заменим на:
//
//     <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         toastClassName="custom-toast"
//     />
//
// 🎨 2. В App.css добавь:
//
//     /* Кастомный стиль для уведомлений */
//     .custom-toast {
//     background-color: #fef3c7; /* светло-золотистый */
//     color: #78350f; /* коричневатый текст */
//     border-left: 5px solid #f59e0b; /* янтарная полоска */
//     font-weight: 500;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//     padding: 12px 16px;
//     border-radius: 12px;
// }
//
// 📦 3. Использование:
//
//     toast.success(`${product.title} added to cart!`);
//
// 🎁 Результат: ты получишь красивое уведомление, которое выглядит как будто из премиального UI-кита — идеально для стильного магазина свечей.
//
//     Хочешь анимацию появления/исчезновения тоста тоже настроить?
//     Вы сказали:
// да
// ChatGPT сказал:
//
//     Отлично! Давай добавим кастомную анимацию для появления и исчезновения тостов, чтобы они выглядели более живо и профессионально ✨
// ✅ 1. Обнови ToastContainer:
//
//     Добавь кастомные классы для входа/выхода:
//
// <ToastContainer
//     position="top-right"
//     autoClose={2000}
//     hideProgressBar={false}
//     closeOnClick
//     pauseOnHover
//     draggable
//     pauseOnFocusLoss
//     toastClassName="custom-toast"
//     transition={Slide}
// />
//
// Можно использовать Slide, Zoom, Flip, Bounce (встроенные), либо кастомные. Мы сделаем свой.
// 🎨 2. Добавь анимации в App.css:
//
// /* Кастомная анимация */
// @keyframes slideIn {
//     from {
//         opacity: 0;
//         transform: translateX(100%);
//     }
//     to {
//         opacity: 1;
//         transform: translateX(0);
//     }
// }
//
// @keyframes slideOut {
//     from {
//         opacity: 1;
//         transform: translateX(0);
//     }
//     to {
//         opacity: 0;
//         transform: translateX(100%);
//     }
// }
//
// .custom-toast {
//     animation: slideIn 0.4s ease forwards;
// }
//
// .custom-toast--exit {
//     animation: slideOut 0.4s ease forwards;
// }
//
// 💡 3. (Опционально) Если хочешь ещё больше кастомизации:
//
//     Можно использовать библиотеку framer-motion или управлять отображением тостов вручную, но для начала это решение достаточно лёгкое и красивое.