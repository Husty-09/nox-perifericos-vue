<template>
  <div id="main-banner">
    <div class="banner-content">
      <h1>NOX Periféricos</h1>
      <p>Eleve seu nível para a elite dos e-sports.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-image: url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80");
  background-position: center;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

#main-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 1));
}

.banner-content {
  z-index: 1;
  text-align: center;
  animation: fadeIn 1s ease-out;
}

#main-banner h1 {
  font-size: 60px;
  font-weight: 900;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(176, 38, 255, 0.8);
  letter-spacing: 2px;
}

#main-banner p {
  font-size: 24px;
  color: #ccc;
  font-weight: 300;
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
