<template>
  <div class="header">
    <div class="header-logo">
      <div class="text-logo">крок</div>
    </div>
    <div class="header-title">Hypervisor Parameter Monitoring System</div>
    <div class="header-auth">войти</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header * {
  font-family: 'Tilda-Sans_extra-bold', serif;
}
.header {
  grid-area: h;
  background: #656565;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 4px gray;
  z-index: 1;
}
.header-title {
  color: white;
  font-size: 28px;
  padding: 4px 12px 6px 12px;
  border-radius: 5px;
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
  box-shadow: 1px 1px 1px 1px black;
}
.text-logo {
  text-transform: uppercase;
  color: white;
  font-size: 30px;
}
</style>