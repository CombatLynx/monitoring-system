<template>
  <transition name="modal">
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
      <div class="modal">
        <div class="modal-close" @click="closeModal">&#10006;</div>
        <slot name="title">
          <h3 class="modal-title">Заголовок</h3>
        </slot>
        <slot name="body">
          <div class="modal-content">
            Дефолтный контент модального окна
          </div>
        </slot>
        <slot name="footer">
          <div class="modal-footer">
            <button class="modal-footer__button" @click="closeModal">
              Ок
            </button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalWindow",
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    closeModal: function () {
      this.show = false
    }
  }
}
</script>

<style scoped>
.modal-shadow {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 1s
}
.modal-enter, .modal-leave-to {
  opacity: 0
}
.modal {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>