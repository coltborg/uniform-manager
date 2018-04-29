<template lang="pug">
  .grid(

  )
    .px-2.py-2.text-black {{ equipment.fields.id }}
    .px-2.py-2.text-black {{ ownerDisplayName }}
    .px-2.py-2.text-black {{ ownerDisplayId }}
    .px-2.py-2.text-black ---
    .px-2.py-2.text-black ---
    .px-2.py-2.text-black ---
    .px-2.py-2.text-black ---
    .px-2.py-2.text-black ---
</template>

<script>
import { mapState } from "vuex";

export default {
  // data: () => {
  //   return: {

  //   }
  // },

  props: {
    equipment: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState("students", {
      // students: state => state.students,
      // studentRaw: state => state.studentsRaw
    }),

    owner() {
      const assignedStudent = this.equipment.fields.assignedToStudentId

      if (assignedStudent) {
        return assignedStudent
      }

      else {
        return false
      }
    },

    ownerDisplayName() {
      const owner = this.owner
      return (owner) ? owner.fields.name : '---'
    },

    ownerDisplayId() {
      const owner = this.owner
      return (owner) ? owner.fields.id : '---'
    }
  },

  methods: {
    clickedStudent() {

    }
  }
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
