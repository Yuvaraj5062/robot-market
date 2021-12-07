import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Products/>} />
      <Route exact path="/cart" element={<Cart/>} />
    </Routes>

  );
}
export default App;
