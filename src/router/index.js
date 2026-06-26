import { createRouter, createWebHistory } from "vue-router";
import MenuView from "@/views/MenuView.vue";
import PedidosView from "@/views/PedidosView.vue";
import ConfiguracaoPedidoView from "@/views/ConfiguracaoPedidoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MenuView,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    component: () =>
      import(/* webpackChunkName: "pedidos" */ "../views/PedidosView.vue"),
  },
  {
    path: "/carrinho",
    name: "Carrinho",
    component: () => import("../views/CarrinhoView.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/CheckoutView.vue"),
  },
  {
    path: "/config-pedido",
    name: "config-pedido",
    component: ConfiguracaoPedidoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
