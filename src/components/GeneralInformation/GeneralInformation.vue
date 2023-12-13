<template>
  <div class="wrapper-block">
    <PieCharts />
    <SliderMain />
  </div>
</template>

<script>
import PieCharts from "@/components/GeneralInformation/ChartsPie/PieCharts.vue";
import SliderMain from "@/components/GeneralInformation/ChartsSlider/SliderMain.vue";

export default {
  components: {SliderMain, PieCharts},
  mounted() {

  }
}
</script>

<style scoped>
.wrapper-block {
  display: flex;
}
</style>