<template>
  <div class="app-wrapper">
    <div class="app-wrapper__container">
      <HeaderPage/>
      <NavbarPage/>
      <div class="main-content">
        <router-link to="/" exact>Back</router-link>
        <MainContentPage/>
      </div>
    </div>
  </div>
</template>

<script>
import MainContentPage from "@/views/MainContentPage.vue";
import NavbarPage from "@/views/NavbarPage.vue";
import HeaderPage from "@/views/HeaderPage.vue";

export default {
  name: 'App',
  components: {
    MainContentPage,
    HeaderPage,
    NavbarPage
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
* {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.app-wrapper {
  width: 100%;
  position: relative;
}
.app-wrapper__container {
  display: grid;
  grid-template-areas:
    "h h h"
    "n m m";
  grid-template-rows: 100px 1fr;
  grid-template-columns: 80px 1fr;
  height: 100vh;
}
.main-content {
  grid-area: m;
  background: #fbfbfb;
  padding: 20px;
}
</style>