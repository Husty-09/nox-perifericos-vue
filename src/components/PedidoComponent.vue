<template>
  <div>
    <MessageAlert :msg="msg" :type="msgType" />
    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-hamburguer-content">
          {{ burguer && burguer.nome ? burguer.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="burguer && burguer.foto ? burguer.foto : ''"
        />
      </div>
      <div class="inputs">
        <label>Especificação</label>
        <select
          v-model="especificacaoSelecionada"
          name="especificacao"
          id="especificacao"
        >
          <option value="" selected>Selecione a especificação</option>
          <option
            v-for="esp in listaEspecificacoes"
            :key="esp.id"
            :value="esp"
          >
            {{ esp.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <input type="submit" class="submit-btn" value="Adicionar ao Carrinho" />
      </div>
    </form>
  </div>
</template>
<script>
import MessageAlert from "./MessageAlert.vue";
import { store } from "../store";

const BASE_URL = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
  name: "PedidoComponent",
  components: {
    MessageAlert,
  },
  props: {
    burguer: null,
  },
  data() {
    return {
      listaEspecificacoes: [],
      listaExtras: [],
      listaAcessorios: [],
      especificacaoSelecionada: "",
      listaExtrasSelecionados: [],
      listaAcessoriosSelecionados: [],
      msg: null,
      msgType: null,
    };
  },
  methods: {
    async getEspecificacoes() {
      const produtoId = this.burguer && this.burguer.id ? this.burguer.id : 0;
      const response = await fetch(`${BASE_URL}/especificacoes?produto_baseId=${produtoId}`);
      const dados = await response.json();
      this.listaEspecificacoes = dados;
    },
    async getAdicionais() {
      const response = await fetch(`${BASE_URL}/adicionais`);
      const dados = await response.json();
      this.listaExtras = dados.complemento;
      this.listaAcessorios = dados.bebidas;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.especificacaoSelecionada || !this.burguer || !this.burguer.nome) {
        this.msg = "Por favor, selecione uma especificação.";
        this.msgType = "error";
        setTimeout(() => (this.msg = null), 4000);
        return;
      }

      const dadosItem = {
        produto: this.burguer,
        ponto: this.especificacaoSelecionada,
        bebidas: Array.from(this.listaAcessoriosSelecionados),
        complemento: Array.from(this.listaExtrasSelecionados),
      };

      store.addToCart(dadosItem);

      this.msg = "Adicionado ao Carrinho!";
      this.msgType = "success";
      setTimeout(() => {
        this.msg = null;
        this.$router.push("/menu");
      }, 1500);
    },
  },
  mounted() {
    this.getEspecificacoes();
    this.getAdicionais();
  },
};
</script>

<style scoped>
#foto-content {
  margin-bottom: 20px;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  height: 250px;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(176, 38, 255, 0.4);
  border: 2px solid rgba(176, 38, 255, 0.5);
}

#nome-hamburguer-content {
  font-size: 38px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 0 0 15px rgba(0, 255, 204, 0.6);
  letter-spacing: 1px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #fff;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid #b026ff;
}

input[type="text"],
select {
  padding: 12px;
  width: 300px;
  border: solid #b026ff 1px;
  border-radius: 8px;
  height: auto;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

select {
  height: 45px;
}

select option {
  background-color: #222;
  color: #fff;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
  color: #ccc;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: transparent;
  color: #00ffcc;
  font-weight: bold;
  border: 2px solid #00ffcc;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.2);
}

.submit-btn:hover {
  background-color: #00ffcc;
  color: #111;
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.6);
}
</style>
