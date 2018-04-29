<template lang="pug">
  .studentShort(
    @click="clickedStudent"
  ) {{ student.name }}
</template>

<script>
import { mapState } from "vuex"

export default {

  // data: () => {
  //   return: {

  //   }
  // },

  props: {
    'student': {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('students', {
      'students': state => state.students,
      'studentRaw': state => state.studentsRaw
    })
  },

  methods: {
    clickedStudent() {
      // console.log(this.student.name)
      this.$emit('studentClicked', this.student)
    }
  }
};
</script>

<style>

</style>
