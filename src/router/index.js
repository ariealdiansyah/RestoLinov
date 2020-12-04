import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Food from '../views/Food.vue'
import OrderFood from '../views/OrderFood.vue'
import Cart from '../views/Cart.vue'
import Success from '../views/SuccessOrder.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/food',
        name: 'Food',
        component: Food
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/foods/:id',
        name: 'Foods',
        component: OrderFood
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/sukses',
        name: 'Success',
        component: Success
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
]

const router = new VueRouter({
    routes
})

export default router