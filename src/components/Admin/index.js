import Dashboard from "./Dasboard/Dashboard";
import DashboardHome from './Dasboard/DashboardHome';
import Products, { fetchProducts } from "./Dasboard/Products/Products";
import Orders, { fetchOrders } from './Dasboard/Orders/Orders';
import Categories, { fetchCategories } from "./Dasboard/Categories/Categories";

export {
    Dashboard,
    DashboardHome,
    Orders,
    Products,
    Categories,
    fetchCategories,
    fetchOrders,
    fetchProducts
}