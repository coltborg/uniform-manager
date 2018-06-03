<template lang="pug">
  .grid(
    v-if="equipment"
    :class="{'bg-orange-lightest border-orange': active}"
  )
    .px-2.py-2.text-black {{ equipment.number }}
    .px-2.py-2.text-black {{ ownerDisplayName }}
    .px-2.py-2.text-black {{ }}
    .px-2.py-2.text-black ---
    .px-2.py-2.text-black ---
    .px-2.py-2.text-black ---
    .px-2.py-2.text-black ---
</template>

<script>
import { mapState } from 'vuex';
// import Configuration from '../services/configuration';

export default {
  props: {
    equipment: {
      type: Object,
      required: true,
    },
    active: {
      type: [Boolean],
      default: false,
    },
  },

  computed: {
    ...mapState('students', {
      // students: state => state.students,
      // studentRaw: state => state.studentsRaw
    }),

    owner() {
      const assignedStudent = this.equipment.assignedToStudentId;

      if (assignedStudent) {
        return assignedStudent;
      }

      return false;
    },

    ownerDisplayName() {
      const { owner } = this;
      return (owner) ? owner.name : '---';
    },

    ownerDisplayId() {
      const { owner } = this;
      return (owner) ? owner.id : '---';
    },
  },

  methods: {
    clickedStudent() {

    },
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
