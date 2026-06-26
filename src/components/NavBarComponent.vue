<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <h2 id="logo-text">NOX</h2>
      </router-link>
      <router-link to="/menu">Produtos</router-link>
      <router-link to="/pedidos">Pedidos</router-link>
      <router-link to="/carrinho" class="cart-link">
        🛒 Carrinho <span class="cart-badge">{{ cartCount }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: "NavBarComponent",
  computed: {
    cartCount() {
      return store.cart.itens.length;
    }
  }
};
</script>

<style scoped>
#logo-text {
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 15px #b026ff, 0 0 30px #b026ff;
  margin: 0;
  letter-spacing: 2px;
}

#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
  text-decoration: none;
}

#nav a {
  color: #ccc;
  text-decoration: none;
  margin: 0 20px;
  transition: 0.3s;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
}

#nav a:not(#logo-url):hover {
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.8);
}

.cart-link {
  display: flex;
  align-items: center;
  background: rgba(176, 38, 255, 0.2);
  padding: 8px 16px !important;
  border-radius: 20px;
  border: 1px solid rgba(176, 38, 255, 0.5);
}

.cart-link:hover {
  background: rgba(0, 255, 204, 0.2);
  border-color: rgba(0, 255, 204, 0.8);
}

.cart-badge {
  background-color: #00ffcc;
  color: #111;
  border-radius: 50%;
  padding: 2px 8px;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 900;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.8);
}

#logo-url:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

#nav {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(176, 38, 255, 0.3);
  padding: 20px 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}
</style>
