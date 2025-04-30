
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import ProductDetail from "./components/ProductDetail.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";



function App() {

  return (
      <Router>
          {/*<h1 className='text-red-700'>Candle store...</h1>*/}
          <Header/>
          <ErrorBoundary>
              <Routes>
                  <Route path='/' element={<Main/>} />
                  <Route path="/product/:id" element={<ProductDetail />}/>
              </Routes>
          </ErrorBoundary>
          {/*<Main/>*/}
          <ToastContainer position="top-right" autoClose={1500} />
      </Router>

  )
}

export default App;

// todo найти в каком месте ошибка useState initial state - null из-за этого, вероятно, не сохраняется localStorage после перезагрузки страницы