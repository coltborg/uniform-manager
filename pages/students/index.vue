<template lang="pug">
  div
    section.mt-8.mx-4
      h1.mt-0.mb-4.text-3xl.font-bold Students
      div
        .grid.bg-grey-lightest
          .p-2.text-grey-dark.font-bold Student Name
          .p-2.text-grey-dark.font-bold Bibber
          .p-2.text-grey-dark.font-bold Shirts
          .p-2.text-grey-dark.font-bold Gauntlets
          .p-2.text-grey-dark.font-bold Jackets
          .p-2.text-grey-dark.font-bold Shakos
          .p-2.text-grey-dark.font-bold Track Suits
          .p-2.text-grey-dark.font-bold Uniform Bags
        student-short(
          v-for="student in students.entities.students"
          :key="student.id"
          :student="student"
          :activeStudentRowId="activeStudentRowId"
          v-on:selectStudentRow="handleSelectStudentRow"
        )
</template>

<script>
import { mapState } from "vuex";
import studentShort from "~/components/studentShort.vue";

export default {
  components: {
    studentShort
  },

  data: () => {
    return {
      activeStudentRow: null
    };
  },

  computed: {
    ...mapState("students", {
      students: state => state.students,
      studentRaw: state => state.studentsRaw
    }),

    activeStudentRowId() {
      let activeStudentRow = this.activeStudentRow
      return (activeStudentRow) ? activeStudentRow.id : false
    }
  },

  methods: {
    handleSelectStudentRow(student) {
      this.activeStudentRow = student;
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
