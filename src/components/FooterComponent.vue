<template>
  <footer id="footer">
    <div class="footer-content">
      <p>Desenvolvido na faculdade por <strong>Matheus Calonico</strong>.</p>
      <a href="https://github.com/Husty-09" target="_blank" class="github-link">
        Visite meu GitHub: @Husty-09
      </a>
      <p class="copyright">&copy; {{ new Date().getFullYear() }} NOX Periféricos Gamers.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
#footer {
  height: 150px;
  background-color: #0a0a0a;
  border-top: 2px solid #b026ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  width: 100%;
  margin-top: auto;
  box-shadow: 0 -5px 15px rgba(176, 38, 255, 0.2);
}

.footer-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-content p {
  margin: 0;
  font-size: 14px;
}

.github-link {
  color: #00ffcc;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: 0.3s;
}

.github-link:hover {
  text-shadow: 0 0 10px #00ffcc;
  color: #fff;
}

.copyright {
  font-size: 12px;
  opacity: 0.6;
}
</style>
