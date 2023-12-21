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
          <pagination class="pagination"/>
        </template>
      </carousel>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import ChartSliderForSystem from "@/components/GeneralInformation/ChartsSlider/ChartSliderForSystem.vue"
import ChartSliderForVM from "@/components/GeneralInformation/ChartsSlider/ChartSliderForVM.vue"

export default {
  name: 'SliderMain',
  data: () => ({
  }),
  components: {
    ChartSliderForSystem,
    ChartSliderForVM,
    Carousel,
    Slide,
    Pagination
  }
}
</script>

<style>
.slider-block {
  width: calc(100% - 550px);
}
.slider-wrapper {
  height: 100%;
}
.slider {
  height: 100%;
}
.pagination {
  margin-top: 30px;
}
.carousel__pagination-button::after {
  width: 30px;
  height: 6px;
  border-radius: 6px;
}
.carousel__pagination-button::after {
  background-color: white;
  border: 1px solid #d7d7d7;
}
.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  background-color: #7F7F7F;
}
</style>