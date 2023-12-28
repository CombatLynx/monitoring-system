<template>
  <transition :name="modalClass">
    <div :class="modalClass">
      <div
          :class="`${modalClass}-backdrop`"
          @click="closeModal"
      >
        <div :class="[{'simple-modal-scrollable': scrollable}, `${modalClass}-container`]">
          <div
              :class="`${modalClass}-content`"
              role="dialog"
              :aria-labelledby="headerId"
              :aria-describedby="bodyId"
              @click.stop
          >
            <header
                :id="headerId"
                :class="`${modalClass}-header`"
            >
              <slot
                  :id="bodyId"
                  name="header"
              >
                Modal title
              </slot>
            </header>
            <section :class="`${modalClass}-body`">
              <slot name="body">
                Modal body
              </slot>
            </section>
            <footer :class="`${modalClass}-footer`">
              <slot name="footer"/>
              <Button label="Закрыть" @click="closeModal"/>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    headerId: {
      type: String,
      required: true,
      default: null,
    },
    bodyId: {
      type: String,
      required: true,
      default: null,
    },
    modalClass: {
      type: String,
      default: 'simple-modal',
    },
  },
  mounted() {
    window.addEventListener('keydown', this.escCloseModal);
  },
  destroy() {
    window.removeEventListener('keydown', this.escCloseModal);
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    escCloseModal(e) {
      if (this.show && e.key === 'Escape') {
        this.closeModal();
      }
    },
  },
};
</script>

<style lang="scss">
.simple-modal {
  &-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.3s ease;
    z-index: 9;
  }

  &-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: auto;
    margin: 16px;
  }

  &-scrollable {
    overflow-x: hidden;
    overflow-y: auto;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 1000px;
    margin: 60px auto;
    color: #000;
    background-color: #fff;
    box-sizing: border-box;
    transform: translate(0, 0);
    transition: all 0.3s ease;
    border-radius: 12px;
  }

  &-header {
    text-align: center;
    background: #656565;
    padding: 20px;
    color: white;
    border-radius: 10px 10px 0 0;
  }

  &-header > div {
    font-size: 22px;
  }

  &-body {
    margin-bottom: 20px;
    padding: 20px 30px 0 30px;
  }

  &-footer {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: center;
    padding: 0 30px 20px 20px;
  }

  &-footer button {
    padding: 5px 0 5px 0;
  }

  &-footer button:first-child {
    margin-right: 20px;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease;
  }
}
</style>