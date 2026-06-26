import { reactive } from 'vue';

export const store = reactive({
  cart: {
    itens: []
  },
  
  addToCart(item) {
    this.cart.itens.push(item);
  },

  removeFromCart(index) {
    this.cart.itens.splice(index, 1);
  },

  clearCart() {
    this.cart.itens = [];
  },
  
  getCartTotal() {
    return this.cart.itens.reduce((total, item) => {
      let itemTotal = item.produto.valor;
      if (item.complemento) {
        itemTotal += item.complemento.reduce((acc, c) => acc + c.valor, 0);
      }
      if (item.bebidas) {
        itemTotal += item.bebidas.reduce((acc, b) => acc + b.valor, 0);
      }
      return total + itemTotal;
    }, 0);
  }
});
