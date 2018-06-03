<template>
  <header class="px-4 pt-2 flex items-center justify-between shadow-md bg-white">
    <div>
      <h1 class="text-2xl uppercase tracking-wide font-semibold">Uniform Manager</h1>
      <div>
        <nuxt-link
          class="mr-4 no-underline"
          to="/">
          Home
        </nuxt-link>
        <nuxt-link
          class="mr-4 no-underline"
          to="students">
          Students
        </nuxt-link>
        <nuxt-link
          class="no-underline"
          to="equipment">
          Equipment
        </nuxt-link>
      </div>
    </div>
    <div>
      <profile-dropdown />
    </div>
  </header>
</template>

<script>
import ProfileDropdown from '~/components/ProfileDropdown';

export default {
  name: 'AppHeader',
  components: {
    ProfileDropdown,
  },
};
</script>
