<template>
  <div id="nox-app">
    <NavBarComponent />
    <BannerComponent v-if="['/', '/menu'].includes($route.path)" />
    <div class="main-content">
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import BannerComponent from "./components/BannerComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
    FooterComponent,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #0a0a0a;
  color: #fff;
}

#nox-app {
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-bottom: 50px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #b026ff;
}

nav a.router-link-exact-active {
  color: #00ffcc;
}

h1 {
  font-size: 3rem;
  margin-top: 40px;
}
</style>
