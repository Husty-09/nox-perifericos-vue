<template>
  <div>
    <h1 class="page-title">Configuração do Produto</h1>
    <pedido-component-vue v-if="hamburguerSelecionado" :burguer="hamburguerSelecionado" />
  </div>
</template>
<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      hamburguerSelecionado: null,
    };
  },
  created() {
    const query = this.$route.query;
    if (query.burguer) {
      const decodeBurguer = JSON.parse(decodeURIComponent(query.burguer));
      this.hamburguerSelecionado = decodeBurguer;
    }
  },
};
</script>
<style scoped>
.page-title {
  text-shadow: 0 0 10px #b026ff;
  margin-bottom: 30px;
}
</style>
