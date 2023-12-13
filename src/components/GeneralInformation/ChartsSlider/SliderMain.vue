<template>
  <div class="slider-block">
    <div class="slider-wrapper">
      <carousel class="slider" :items-to-show="1">
        <slide class="slider-item" :key="0">
          <ChartSliderForVM/>
        </slide>
        <slide class="slider-item" :key="1">
          <ChartSliderForSystem/>
        </slide>
        <template #addons>
          <navigation class=""/>
          <pagination class=""/>
        </template>
      </carousel>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import ChartSliderForSystem from "@/components/GeneralInformation/ChartsSlider/ChartSliderForSystem.vue";
import ChartSliderForVM from "@/components/GeneralInformation/ChartsSlider/ChartSliderForVM.vue";

export default {
  name: 'SliderMain',
  data: () => ({
  }),
  components: {
    ChartSliderForSystem,
    ChartSliderForVM,
    Carousel,
    Slide,
    Pagination,
    Navigation
  }
}
</script>

<style scoped>
.slider-block {
  width: 80%;
}
.slider-wrapper {
  height: 100%;
}
.slider {
  height: 100%;
}
</style>