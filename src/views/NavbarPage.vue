<template>
  <div class="navbar">
    <div class="navbar-item">
      <router-link class="router-link" to="/general-information">
        <img class="router-img" src="../assets/images/GeneralInformation.svg" alt="general-information">
      </router-link>
      <div class="overlay">Общие сведения</div>
    </div>
    <div class="navbar-item">
      <router-link class="router-link" to="/building-report">
        <img class="router-img__building-report" src="../assets/images/BuildingReport.svg" alt="building-report">
      </router-link>
      <div class="overlay">Построение отчета</div>
    </div>
    <div class="navbar-item">
      <router-link class="router-link" to="/plotting-reports">
        <img class="router-img" src="../assets/images/PlottingReports.svg" alt="plotting-reports">
      </router-link>
      <div class="overlay">Построение графиков</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.navbar {
  grid-area: n;
  background: #C5C4C4;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.router-link {
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.router-link:hover {
  background: #e0e0e0;
}
.router-img__building-report {
  width: 32px;
}
.router-img {
  width: 35px;
}
a.router-link-active {
  background: white!important;
}
.navbar-item {
  position: relative;
  margin-top: 30px;
}
.navbar-item .overlay {
  position: absolute;
  display: none;
  background: white;
  border: 1px solid black;
  top: 0;
  left: 100%;
  padding: 5px;
  border-radius: 5px;
}
.navbar-item:hover .overlay {
  display: block;
}
</style>