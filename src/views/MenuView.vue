<template>
  <div class="menu-container">
    <h1>Produtos</h1>
    <div class="grid-container">
      <div
        class="card-content"
        v-for="produto in listaProdutos"
        :key="produto.id"
      >
        <div class="foto-produto">
          <img :src="produto.foto" />
        </div>
        <div class="card-detalhes">
          <h2 class="nome-content">{{ produto.nome }}</h2>
          <p class="preco-content">R$ {{ produto.valor }},00</p>
          <p class="descricao-content">{{ produto.descricao }}</p>
          <button class="config-btn" @click="selecionarProduto(produto)">Configurar e Comprar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const BASE_URL = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
  name: "MenuView",
  data() {
    return {
      listaProdutos: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${BASE_URL}/produtos_base`);
      const dados = await response.json();
      this.listaProdutos = dados;
    },
    selecionarProduto(produtoSelecionado) {
      const param = JSON.stringify(produtoSelecionado);
      const produtoJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { burguer: produtoJson },
      });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped>
.menu-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-shadow: 0 0 15px rgba(176, 38, 255, 0.8);
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  justify-items: center;
}

.card-content {
  width: 100%;
  max-width: 320px;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(176, 38, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
}

.card-content:hover {
  transform: translateY(-10px);
  border-color: rgba(0, 255, 204, 0.5);
  box-shadow: 0 15px 40px rgba(0, 255, 204, 0.2);
}

.foto-produto {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.foto-produto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-content:hover .foto-produto img {
  transform: scale(1.05);
}

.card-detalhes {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.nome-content {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px 0;
}

.preco-content {
  font-size: 28px;
  font-weight: 900;
  color: #00ffcc;
  margin: 0 0 15px 0;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
}

.descricao-content {
  font-size: 14px;
  color: #aaa;
  line-height: 1.5;
  flex-grow: 1;
  margin-bottom: 20px;
}

.config-btn {
  padding: 14px;
  border-radius: 8px;
  border: 2px solid #b026ff;
  color: #fff;
  background: transparent;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.config-btn:hover {
  background: #b026ff;
  box-shadow: 0 0 20px rgba(176, 38, 255, 0.6);
  color: #fff;
}
</style>
