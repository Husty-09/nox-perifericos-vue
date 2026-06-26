<template>
  <div>
    <h1 class="page-title">Gerenciar Pedidos</h1>
    <lista-pedido-component-vue />
  </div>
</template>
<script>
import ListaPedidoComponentVue from "@/components/ListaPedidoComponent.vue";

export default {
  name: "PedidosView",
  components: {
    ListaPedidoComponentVue,
  },
};
</script>
<style scoped>
.page-title {
  text-shadow: 0 0 10px #b026ff;
  margin-bottom: 30px;
}
</style>
