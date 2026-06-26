<template>
  <div class="list-container">
    <div class="pedidos-tabela-cabecalho">
      <div class="col-id">#ID</div>
      <div class="col-nome">Cliente</div>
      <div class="col-prod">Produto Base</div>
      <div class="col-esp">Especificação</div>
      <div class="col-add">Adicionais</div>
      <div class="col-status">Status</div>
      <div class="col-acoes">Ações</div>
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div class="col-id id-highlight">{{ pedido.id }}</div>
      <div class="col-nome fw-bold">{{ pedido.cliente ? pedido.cliente.nome : (pedido.nome || '--') }}</div>
      <div class="col-prod">
        <ul class="clean-list">
          <li v-for="(item, i) in (pedido.itens ? pedido.itens : [pedido])" :key="'p'+i">
            {{ item.produto ? item.produto.nome : (item.burguer ? item.burguer.nome : '--') }}
          </li>
        </ul>
      </div>
      <div class="col-esp text-highlight">
        <ul class="clean-list">
          <li v-for="(item, i) in (pedido.itens ? pedido.itens : [pedido])" :key="'e'+i">
            {{ item.ponto ? item.ponto.descricao : '--' }}
          </li>
        </ul>
      </div>
      <div class="col-add">
        <ul class="clean-list">
          <template v-for="(item, i) in (pedido.itens ? pedido.itens : [pedido])">
            <li v-for="(extra, j) in item.complemento" :key="'c'+i+j">+ {{ extra.nome }}</li>
            <li v-for="(acessorio, j) in item.bebidas" :key="'a'+i+j">+ {{ acessorio.nome }}</li>
          </template>
        </ul>
      </div>
      <div class="col-status">
        <select
          @change="atualizarStatusPedido($event, pedido.id)"
          name="status"
          class="status-select"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div class="col-acoes">
        <button class="delete-btn" @click="deletarPedido(pedido.id)">Cancelar</button>
      </div>
    </div>
  </div>
</template>
<script>
const BASE_URL = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
  name: "ListaPedidoComponent",
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch(`${BASE_URL}/pedidos`);
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch(`${BASE_URL}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
      await fetch(`${BASE_URL}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });
    },
    async deletarPedido(idPedido) {
      const response = await fetch(`${BASE_URL}/pedidos/${idPedido}`, {
        method: "DELETE",
      });
      if (response.ok || response.status === 200) {
        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (p) => p.id !== idPedido
        );
      }
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>
<style scoped>
.list-container {
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(176, 38, 255, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.pedidos-tabela-cabecalho {
  display: flex;
  font-weight: 900;
  padding: 20px;
  background-color: rgba(176, 38, 255, 0.1);
  border-bottom: 2px solid #b026ff;
  color: #fff;
  letter-spacing: 1px;
}

.pedidos-tabela-linha {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #ccc;
  transition: background-color 0.3s;
  align-items: center;
}

.pedidos-tabela-linha:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  flex-grow: 1;
}

.col-id { flex: 0 0 5%; text-align: center; }
.col-nome { flex: 0 0 15%; }
.col-prod { flex: 0 0 15%; }
.col-esp { flex: 0 0 15%; }
.col-add { flex: 0 0 20%; }
.col-status { flex: 0 0 15%; }
.col-acoes { flex: 0 0 10%; text-align: right; }

.id-highlight {
  color: #b026ff;
  font-weight: bold;
  font-size: 1.1em;
}

.text-highlight {
  color: #00ffcc;
}

.fw-bold {
  font-weight: bold;
  color: #fff;
}

ul.clean-list {
  padding-left: 0;
  margin: 0;
  list-style-type: none;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 5px 0;
}

.status-select {
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 1px solid rgba(0, 255, 204, 0.5);
  border-radius: 6px;
  width: 100%;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.status-select:focus, .status-select:hover {
  border-color: #00ffcc;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
  outline: none;
}

.status-select option {
  background-color: #111;
  color: #fff;
}

.delete-btn {
  background-color: transparent;
  color: #ff3366;
  border: 1px solid #ff3366;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.delete-btn:hover {
  background-color: #ff3366;
  color: #fff;
  box-shadow: 0 0 15px rgba(255, 51, 102, 0.6);
}
</style>
