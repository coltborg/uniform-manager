<template>
  <on-click-outside :do="close">
    <div
      :class="{ 'is-active': isOpen }"
      class="search-select">
      <button
        ref="button"
        type="button"
        class="p-1 rounded-full focus-ring hover:bg-grey-light"
        @click="open">
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
          class="search-select-dropdown">
          <div>test</div>
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
    setupPopper() {
      if (this.popper === undefined) {
        this.popper = new Popper(this.$refs.button, this.$refs.dropdown, {
          placement: 'bottom',
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

.search-select {
  position: relative;
}
.search-select-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-align: left;
  display: block;
  width: 100%;
  border-width: 1px;
  padding: 0.5rem 0.75rem;
  background-color: #fff;
  border-radius: 0.25rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.search-select-input:focus {
  outline: 0;
  -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
}
.search-select-placeholder {
  color: #8795a1;
}
.search-select.is-active .search-select-input {
  -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
}
.search-select-dropdown {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  position: absolute;
  right: 0;
  left: 0;
  background-color: #3d4852;
  padding: 0.5rem;
  border-radius: 0.25rem;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 50;
}
.search-select-search {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #606f7b;
  color: #fff;
  border-radius: 0.25rem;
}
.search-select-search:focus {
  outline: 0;
}
.search-select-options {
  list-style: none;
  padding: 0;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  max-height: 14rem;
}
.search-select-option {
  padding: 0.5rem 0.75rem;
  color: #fff;
  cursor: pointer;
  border-radius: 0.25rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.search-select-option:hover {
  background-color: #606f7b;
}
.search-select-option.is-active,
.search-select-option.is-active:hover {
  background-color: #3490dc;
}
.search-select-empty {
  padding: 0.5rem 0.75rem;
  color: #b8c2cc;
}
</style>
