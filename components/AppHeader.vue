<template>
  <header class="px-2 sm:px-4 sm:flex sm:items-center sm:justify-between shadow-md bg-white">
    <div class="sm:flex sm:items-center">
      <div class="flex items-center justify-between">
        <nuxt-link
          class="sm:mr-8 text-black no-underline header-link"
          to="/">
          <h1 class="text-xl uppercase tracking-wide font-semibold">Uniform Manager</h1>
        </nuxt-link>
        <profile-dropdown class="sm:hidden" />
      </div>
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
    <profile-dropdown class="hidden sm:block" />
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
  border-bottom-color: #38C172;
}
</style>
