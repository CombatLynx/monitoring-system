<template>
  <ModalWindow
      v-show="isShowModal"
      :show="isShowModal"
      :scrollable="true"
      header-id="modalHeader"
      body-id="modalBody"
      @close="toggleModal"
  >
    <template v-slot:header></template>
    <template v-slot:body>
      <div class="card flex justify-content-center">
        <Password v-model="value" toggleMask />
      </div>
    </template>
    <template v-slot:footer></template>
  </ModalWindow>
</template>

<script>
import {defineComponent} from "vue";
import ModalWindow from "@/utils/ModalWindow.vue";

export default defineComponent({
  name: 'AuthorizationPage',
  components: {ModalWindow},
  mounted() {
    this.toggleModal()
  },
  data: () => ({
    isShowModal: false,
    value: null
  }),
  methods: {
    toggleModal() {
      this.isShowModal = !this.isShowModal
    }
  }
})
</script>

<style>

</style>
<script setup>
</script>