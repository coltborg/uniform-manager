<template>
  <on-click-outside :do="close">
    <div
      :class="{ 'is-active': isOpen }"
      class="relative">
      <button
        ref="button"
        type="button"
        class="p-1 rounded-full focus-ring hover:bg-grey-light"
        @click="open"
        @keydown.esc="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24">
          <path
            class="heroicon-ui"
            d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" />
        </svg>
        <div
          v-show="isOpen"
          ref="dropdown"
          class="my-1 p-3 w-48 text-left rounded shadow-md bg-white z4">
          <a
            href="#"
            class="text-blue"
            @click="logout">Log out</a>
        </div>
      </button>
    </div>
  </on-click-outside>
</template>

<script>
import Popper from 'popper.js';
import OnClickOutside from '../components/OnClickOutside';

export default {
  components: {
    OnClickOutside,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  beforeDestroy() {
    this.popper.destroy();
  },
  methods: {
    open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      this.$nextTick(() => {
        this.setupPopper();
      });
    },
    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.$refs.button.focus();
    },
    logout() {
      window.localStorage.removeItem('access_token');
      window.location.reload();
    },
    setupPopper() {
      if (this.popper === undefined) {
        this.popper = new Popper(this.$refs.button, this.$refs.dropdown, {
          placement: 'bottom-end',
        });
      } else {
        this.popper.scheduleUpdate();
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.focus-ring:focus {
  outline: 0;
  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
}
</style>
