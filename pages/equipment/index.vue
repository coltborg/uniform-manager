<template lang="pug">
  div
    section.mt-8.mx-4
      h1.mt-0.mb-4.text-3xl.font-bold Equipment
      div(
          v-if="allEquipmentRaw"
      )
        .grid.bg-grey-lightest
          .p-2.text-grey-dark.font-bold Equip. ID
          .p-2.text-grey-dark.font-bold Owner Name
          .p-2.text-grey-dark.font-bold Owner ID
        equipment-short(
          v-for="(equipment, index) in allEquipmentRaw"
          :key="index"
          :equipment="equipment"
        )
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import equipmentShort from '~/components/equipmentShort.vue';

export default {
  components: {
    equipmentShort,
  },

  data: () => ({
    activeStudentRow: null,
  }),

  computed: {
    ...mapState('equipment', {
      equipment: state => state,
    }),

    ...mapGetters('equipment', [
      'allEquipment',
      'allEquipmentRaw',
    ]),
  },

  methods: {

  },
};
</script>

<style lang="postcss" scoped>
.grid {
  display: grid;
  grid-template:
    1fr
    / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
}
</style>
