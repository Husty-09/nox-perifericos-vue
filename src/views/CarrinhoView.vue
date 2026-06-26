<template>
  <div class="carrinho-container">
    <h1 class="page-title">Seu Carrinho</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Seu carrinho está vazio.</p>
      <router-link to="/menu" class="btn-primary">Ver Produtos</router-link>
    </div>
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <img :src="item.produto.foto" class="item-foto" />
          <div class="item-details">
            <h2>{{ item.produto.nome }}</h2>
            <p class="specs">Esp: {{ item.ponto.descricao }}</p>
            <ul class="extras">
              <li v-for="ex in item.complemento" :key="'e'+ex.id">+ {{ ex.nome }} (R$ {{ ex.valor }})</li>
              <li v-for="ac in item.bebidas" :key="'a'+ac.id">+ {{ ac.nome }} (R$ {{ ac.valor }})</li>
            </ul>
          </div>
          <div class="item-actions">
            <button @click="remover(index)" class="btn-remove">Remover</button>
          </div>
        </div>
      </div>
      <div class="cart-summary">
        <h2>Resumo do Pedido</h2>
        <p class="total">Total: <span class="highlight-text">R$ {{ total }},00</span></p>
        <router-link to="/checkout" class="btn-checkout">Continuar para Checkout</router-link>
        <router-link to="/menu" class="btn-secondary">Adicionar Mais Itens</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: "CarrinhoView",
  computed: {
    cartItems() {
      return store.cart.itens;
    },
    total() {
      return store.getCartTotal();
    }
  },
  methods: {
    remover(index) {
      store.removeFromCart(index);
    }
  }
};
</script>

<style scoped>
.carrinho-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  text-shadow: 0 0 15px rgba(176, 38, 255, 0.8);
  margin-bottom: 40px;
}

.empty-cart {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(176, 38, 255, 0.2);
  border-radius: 16px;
  padding: 50px;
  text-align: center;
}

.empty-cart p {
  font-size: 20px;
  color: #ccc;
  margin-bottom: 30px;
}

.cart-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.cart-items {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(176, 38, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s;
}

.cart-item:hover {
  transform: translateX(10px);
  border-color: rgba(0, 255, 204, 0.5);
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.1);
}

.item-foto {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #b026ff;
}

.item-details {
  flex: 1;
  text-align: left;
}

.item-details h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.specs {
  color: #00ffcc;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.extras {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #ccc;
  font-size: 14px;
}

.btn-remove {
  background: transparent;
  color: #ff3366;
  border: 1px solid #ff3366;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn-remove:hover {
  background: #ff3366;
  color: #fff;
  box-shadow: 0 0 15px rgba(255, 51, 102, 0.5);
}

.cart-summary {
  flex: 1;
  min-width: 300px;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid #b026ff;
  border-radius: 16px;
  padding: 30px;
  position: sticky;
  top: 100px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.cart-summary h2 {
  margin-top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
}

.total {
  font-size: 24px;
  font-weight: 900;
  margin: 20px 0;
}

.highlight-text {
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.4);
}

.btn-checkout, .btn-primary {
  display: block;
  width: 100%;
  background: linear-gradient(45deg, #b026ff, #00ffcc);
  color: #111;
  text-decoration: none;
  padding: 15px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 15px;
  transition: 0.3s;
  border: none;
  text-align: center;
}

.btn-checkout:hover, .btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.6);
  color: #fff;
}

.btn-secondary {
  display: block;
  width: 100%;
  background: transparent;
  color: #b026ff;
  border: 2px solid #b026ff;
  text-decoration: none;
  padding: 12px;
  border-radius: 12px;
  font-weight: bold;
  transition: 0.3s;
}

.btn-secondary:hover {
  background: #b026ff;
  color: #fff;
  box-shadow: 0 0 15px rgba(176, 38, 255, 0.5);
}
</style>
