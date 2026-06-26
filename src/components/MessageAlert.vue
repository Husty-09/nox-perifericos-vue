<template>
  <div v-if="msg" :class="['alert', typeClass]">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "MessageAlert",
  props: {
    msg: String,
    type: {
      type: String,
      default: "info"
    }
  },
  computed: {
    typeClass() {
      switch (this.type) {
        case "success":
          return "alert-success";
        case "error":
          return "alert-error";
        case "warning":
          return "alert-warning";
        case "info":
        default:
          return "alert-info";
      }
    }
  }
};
</script>

<style scoped>
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.alert-success {
  color: #00ffcc;
  background-color: rgba(0, 255, 204, 0.1);
  border-color: #00ffcc;
  text-shadow: 0 0 5px rgba(0, 255, 204, 0.5);
}

.alert-error {
  color: #ff3366;
  background-color: rgba(255, 51, 102, 0.1);
  border-color: #ff3366;
  text-shadow: 0 0 5px rgba(255, 51, 102, 0.5);
}

.alert-warning {
  color: #ffaa00;
  background-color: rgba(255, 170, 0, 0.1);
  border-color: #ffaa00;
  text-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
}

.alert-info {
  color: #33ccff;
  background-color: rgba(51, 204, 255, 0.1);
  border-color: #33ccff;
  text-shadow: 0 0 5px rgba(51, 204, 255, 0.5);
}
</style>
