<template lang="pug">
  div.font-sans.text-black
    header.text-green.bg-green-lightest
      h1.mb-4.text-2xl.text-center Global Header (Goes Here)
      .mx-4
        nuxt-link.mr-4.text-green.no-underline(to="/") Home
        nuxt-link.mr-4.text-green.no-underline(to="students") Students
        nuxt-link.text-green.no-underline(to="equipment") Equipment
    nuxt
</template>
