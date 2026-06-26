# 🎮 NOX Periféricos Gamers (Vue 3)

Bem-vindo ao repositório oficial da **NOX Periféricos**, um projeto evoluído a partir da base estrutural do sistema T-Burguer, focado em trazer uma experiência de e-commerce premium com design *Glassmorphism* e funcionalidades avançadas de carrinho de compras.

> Projeto desenvolvido como trabalho final da disciplina de Desenvolvimento Web - Vue 3.

## 🎯 Visão Geral do Novo Modelo de Negócio

O sistema foi completamente transformado de uma lanchonete (T-Burguer) para uma loja de hardware de elite voltada ao público gamer e profissional de e-sports. 

**O que mudou:**
- **Identidade Visual:** Migramos de um design "amarelo/marrom" com fontes básicas para um tema Escuro Premium, utilizando a paleta Neon (Ciano e Roxo), sombras interativas e filtros de vidro (`backdrop-filter`).
- **Arquitetura de Dados (`db.json`):** 
  Os "Pães e Carnes" foram substituídos por produtos tecnológicos. A antiga "Especificação" foi adaptada. Agora, um Teclado exige a escolha de um *Switch*, enquanto um Mouse exige a escolha de um *Sensor Óptico*. 
- **Carrinho e Checkout:** Implementamos um gerenciador de estado global nativo (usando `reactive` do Vue 3) que permitiu um fluxo de compras de múltiplas etapas, onde o usuário configura o produto, adiciona ao carrinho, revisa os totais e só então finaliza o Checkout com dados de entrega e pagamento.

```javascript
// Exemplo do Estado Reativo construído
import { reactive } from 'vue';

export const store = reactive({
  cart: { itens: [] },
  addToCart(item) { this.cart.itens.push(item); },
  clearCart() { this.cart.itens = []; },
});
```

## 🛠️ Solução Técnica dos Alertas (Feedback Semântico)

A comunicação visual eficaz (como exigido pela metodologia do curso) foi garantida pelo componente global estendido `MessageAlert.vue`.
Em vez de utilizar alertas genéricos de navegador, o sistema intercepta erros (como campos vazios) ou sucessos (como um pedido finalizado) e injeta mensagens reativas através de Props que variam suas classes semânticas.

**Sistema Semântico de Cores:**
- `success` (Verde Neon) - Sucesso em adicionar ao carrinho ou comprar.
- `error` (Vermelho) - Erro de preenchimento.
- `warning` (Laranja) - Avisos importantes.
- `info` (Azul) - Informações contextuais.

**Exemplo de uso no Checkout (Redirecionamento Inteligente):**
Ao confirmar o pedido com sucesso, o sistema levanta um alerta `success` que informa o cliente e, de forma natural através do ciclo de vida assíncrono, redireciona-o para a página de monitoramento de pedidos:

```javascript
if (req.ok || req.status === 201) {
  store.clearCart();
  this.msg = "Pedido processado com sucesso! Redirecionando...";
  this.msgType = "success"; // Alerta Verde Semântico
  
  setTimeout(() => {
    this.msg = null;
    this.$router.push("/pedidos"); // UX de navegação natural imediata
  }, 2000);
}
```

## 🔗 Links Importantes

- **Link da API (JSON Server Deploy):** [https://api-nox.vercel.app/](https://api-nox.vercel.app/)
- **Link de Produção (GitHub Pages):** [https://husty-09.github.io/nox-perifericos-vue/](https://husty-09.github.io/nox-perifericos-vue/)
- **Repositório Front-End:** [https://github.com/Husty-09/nox-perifericos-vue](https://github.com/Husty-09/nox-perifericos-vue)

## 🚀 Como Rodar Localmente

1. Instale as dependências:
```bash
npm install
```
2. Inicialize a API Mock:
```bash
npm run bancojson
```
3. Inicialize o Servidor Vue:
```bash
npm run serve
```
