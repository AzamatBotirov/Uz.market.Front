import HelloWorld from "./components/HelloWorld";
import Login from "./components/login"
import Product from "./components/Product";
import MarketBase from "./components/MarketBase";
import MarketBaseList from "./components/MarketBaseList";
import PaymentList from "./components/PaymentList";

export default [
    {path: '/login', component: Login},
    {path: '/', component: HelloWorld},
    {path: '/product', component: Product},
    {path: '/market-base', component: MarketBase},
    {path: '/market-base/list', component: MarketBaseList},
    {path: '/payment_list', component: PaymentList},


]