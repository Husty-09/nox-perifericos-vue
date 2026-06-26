<template>
  <div class="checkout-container">
    <h1 class="page-title">Finalizar Compra</h1>
    
    <MessageAlert :msg="msg" :type="msgType" />

    <form @submit.prevent="finalizarCompra" class="checkout-form">
      <div class="form-section">
        <h2>Dados Pessoais</h2>
        <div class="form-row">
          <div class="input-group">
            <label>Nome</label>
            <input v-model="formData.nome" type="text" required placeholder="Ex: João" />
          </div>
          <div class="input-group">
            <label>Sobrenome</label>
            <input v-model="formData.sobrenome" type="text" required placeholder="Ex: Silva" />
          </div>
        </div>
        <div class="form-row">
          <div class="input-group">
            <label>E-mail</label>
            <input v-model="formData.email" type="email" required placeholder="joao@exemplo.com" />
          </div>
          <div class="input-group">
            <label>Telefone</label>
            <input v-model="formData.telefone" type="tel" required placeholder="(11) 99999-9999" />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Endereço de Entrega</h2>
        <div class="form-row">
          <div class="input-group">
            <label>CEP</label>
            <input v-model="formData.cep" type="text" required placeholder="00000-000" />
          </div>
          <div class="input-group flex-2">
            <label>Endereço Completo</label>
            <input v-model="formData.endereco" type="text" required placeholder="Rua, Número, Bairro" />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Pagamento</h2>
        <div class="payment-methods">
          <label class="payment-option" :class="{'active': formData.pagamento === 'PIX'}">
            <input type="radio" value="PIX" v-model="formData.pagamento" required />
            <span class="icon">⚡</span> PIX (Aprovação imediata)
          </label>
          <label class="payment-option" :class="{'active': formData.pagamento === 'Cartão de Crédito'}">
            <input type="radio" value="Cartão de Crédito" v-model="formData.pagamento" required />
            <span class="icon">💳</span> Cartão de Crédito
          </label>
        </div>
      </div>

      <div class="checkout-footer">
        <p class="total-text">Total a Pagar: <span>R$ {{ total }},00</span></p>
        <button type="submit" class="btn-submit">Confirmar Pedido</button>
      </div>
    </form>
  </div>
</template>

<script>
import { store } from "../store";
import MessageAlert from "../components/MessageAlert.vue";

const BASE_URL = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
  name: "CheckoutView",
  components: {
    MessageAlert,
  },
  data() {
    return {
      formData: {
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cep: "",
        endereco: "",
        pagamento: ""
      },
      msg: null,
      msgType: null
    };
  },
  computed: {
    total() {
      return store.getCartTotal();
    }
  },
  methods: {
    async finalizarCompra() {
      if (store.cart.itens.length === 0) {
        this.msg = "O carrinho está vazio!";
        this.msgType = "error";
        setTimeout(() => this.$router.push("/menu"), 2000);
        return;
      }

      const pedidoPayload = {
        cliente: this.formData,
        itens: store.cart.itens,
        valorTotal: this.total,
        statusId: 1 // Pagamento Aprovado
      };

      try {
        const req = await fetch(`${BASE_URL}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedidoPayload),
        });

        if (req.ok || req.status === 201) {
          store.clearCart();
          this.msg = "Pedido processado com sucesso! Redirecionando...";
          this.msgType = "success";
          
          setTimeout(() => {
            this.msg = null;
            this.$router.push("/pedidos");
          }, 2000);

        } else {
          this.msg = "Erro ao processar o pedido. Revise seus dados.";
          this.msgType = "error";
          setTimeout(() => (this.msg = null), 4000);
        }
      } catch (err) {
        this.msg = "Falha de comunicação com o servidor.";
        this.msgType = "error";
        setTimeout(() => (this.msg = null), 4000);
      }
    }
  },
  mounted() {
    if (store.cart.itens.length === 0) {
      this.$router.push("/carrinho");
    }
  }
};
</script>

<style scoped>
.checkout-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  text-shadow: 0 0 15px rgba(0, 255, 204, 0.8);
  margin-bottom: 40px;
  color: #00ffcc;
}

.checkout-form {
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(176, 38, 255, 0.2);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.form-section {
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 30px;
}

.form-section h2 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.form-section h2::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 20px;
  background: #b026ff;
  margin-right: 10px;
  border-radius: 2px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.flex-2 {
  flex: 2;
}

label {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"], input[type="email"], input[type="tel"] {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(176, 38, 255, 0.4);
  color: #fff;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;
}

input:focus {
  outline: none;
  border-color: #00ffcc;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
}

.payment-methods {
  display: flex;
  gap: 20px;
}

.payment-option {
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  transition: 0.3s;
  color: #ccc;
}

.payment-option input {
  display: none;
}

.payment-option.active {
  border-color: #00ffcc;
  background: rgba(0, 255, 204, 0.1);
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.2);
}

.icon {
  font-size: 24px;
  margin-right: 10px;
}

.checkout-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.total-text {
  font-size: 20px;
  color: #ccc;
}

.total-text span {
  font-size: 28px;
  font-weight: 900;
  color: #00ffcc;
  margin-left: 10px;
}

.btn-submit {
  background: linear-gradient(45deg, #b026ff, #00ffcc);
  color: #111;
  border: none;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  transition: 0.3s;
}

.btn-submit:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(0, 255, 204, 0.5);
  color: #fff;
}
</style>
