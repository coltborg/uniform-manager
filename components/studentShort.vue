<template lang="pug">
  .grid(
    @click="clickedStudent"
  )
    .px-2.py-2.text-black {{ student.name }}
    .px-2.py-2.text-black #01
    .px-2.py-2.text-black Md
    .px-2.py-2.text-black #45
    .px-2.py-2.text-black #40
    .px-2.py-2.text-black #40
    .px-2.py-2.text-black Md
    .px-2.py-2.text-black #105
</template>

<script>
import { mapState } from "vuex";

export default {
  // data: () => {
  //   return: {

  //   }
  // },

  props: {
    student: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState("students", {
      students: state => state.students,
      studentRaw: state => state.studentsRaw
    })
  },

  methods: {
    clickedStudent() {
      this.$emit("studentClicked", this.student);
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
