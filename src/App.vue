<template>
  <div class="app-wrapper">
    <div class="app-wrapper__container">
      <HeaderPage/>
      <NavbarPage/>
      <div class="main-content">
<!--        <router-link class="back" to="/" exact>Back</router-link>-->
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
@font-face {
  font-family: "Tilda-Sans_extra-bold";
  src: local("Tilda-Sans_extra-bold"),
  url('@/assets/fonts/tilda-sans/tilda-sans_black.woff2') format("truetype");
}
@font-face {
  font-family: "Tilda-Sans_light";
  src: local("Tilda-Sans_light"),
  url('@/assets/fonts/tilda-sans/tilda-sans_light.woff2') format("truetype");
}
@font-face {
  font-family: "Tilda-Sans_regular";
  src: local("Tilda-Sans_regular"),
  url('@/assets/fonts/tilda-sans/tilda-sans_regular.woff2') format("truetype");
}
html,
body {
  height: 100%;
  margin: 0;
}
* {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Tilda-Sans_regular', serif;
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
  background: #eeeeee;
  padding: 20px;
}
.p-button {
  background: #458a45;
  border: 1px solid #3c773c;
}
.p-button:not(:disabled):hover {
  border-color: #3c773c;
}
.p-button:focus {
  box-shadow: 0 0 0 0.2rem rgba(85, 169, 85, 0.3);
}
.back {
  position: absolute;
}
</style>