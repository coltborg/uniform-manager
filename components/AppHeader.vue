<template>
  <header class="px-4 flex items-center justify-between shadow-md bg-white">
    <div class="flex items-center">
      <nuxt-link
        class="mr-8 text-black no-underline header-link"
        to="/">
        <h1 class="text-xl uppercase tracking-wide font-semibold">Uniform Manager</h1>
      </nuxt-link>
      <div class="flex">
        <nuxt-link
          :class="homeRoute"
          class="mr-4 no-underline text-grey-darker header-link"
          to="/">
          Home
        </nuxt-link>
        <nuxt-link
          :class="studentsRoute"
          class="mr-4 no-underline text-grey-darker header-link"
          to="students">
          Students
        </nuxt-link>
        <nuxt-link
          :class="equipmentRoute"
          class="no-underline text-grey-darker header-link"
          to="equipment">
          Equipment
        </nuxt-link>
      </div>
    </div>
    <profile-dropdown />
  </header>
</template>

<script>
import ProfileDropdown from '~/components/ProfileDropdown';

export default {
  name: 'AppHeader',
  components: {
    ProfileDropdown,
  },
  computed: {
    homeRoute() {
      return { 'is-active': this.$route.name === 'index' };
    },
    studentsRoute() {
      return { 'is-active': this.$route.name === 'students' };
    },
    equipmentRoute() {
      return { 'is-active': this.$route.name === 'equipment' };
    },
  },
};
</script>

<style scoped>
.header-link {
  line-height: 40px;
  border-bottom: 4px solid transparent;
  border-top: 4px solid transparent;
}

.header-link.is-active {
  border-bottom-color: #3490DC;
}
</style>
