<template>
  <div class="header">
    <div class="header-logo">
      <img src="../assets/images/logo.jpg" alt="logo">
    </div>
    <div class="header-title">Hypervisor Parameter Monitoring System</div>
    <div class="header-auth">войти</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header {
  grid-area: h;
  background: #74BBE4;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.header-title {
  font-size: 24px;
  text-shadow: 2px 7px 5px rgba(0,0,0,0.3),
               0px -4px 10px rgba(255,255,255,0.3);
}
.header-logo {
  margin-left: 20px;
}
.header-logo img {
  width: 100px;
}
.header-auth {
  margin-right: 20px;
  background: #D9D9D9;
  padding: 8px 20px 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>